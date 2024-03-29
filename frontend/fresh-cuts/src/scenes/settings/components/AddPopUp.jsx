import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function AddPopUp({ onSubmit, onClose }) {
  const [newServiceData, setNewServiceData] = useState({
    name: "",
    price: 0,
    duration: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleChange = (field) => (event) => {
    if (field === "duration") {
      console.log(typeof event.$d);
      const selectedDate = dayjs(event.$d);

      // Format the selected time as "HH:mm:ss"
      const formattedTime = selectedDate.format("HH:mm:ss");
      console.log(formattedTime);
      //console.log(typeof formattedTime);
      setNewServiceData((prevData) => ({
        ...prevData,
        duration: formattedTime,
      }));
    } else {
      const value = event.target.value;
      setNewServiceData((prevData) => ({
        ...prevData,
        [field]: field === "price" ? parseFloat(value) || 0 : value,
      }));
    }
  };

  const handleSubmit = () => {
    if (!newServiceData.name.trim()) {
      setError("Service name is required");
      return;
    }

    onSubmit(newServiceData);
    setNewServiceData({
      name: "",
      price: 0,
      duration: "",
      description: "",
    });
    setError("");
  };

  const [selectedTime, setSelectedTime] = useState(dayjs("HH:mm:00"));

  const handleTimeChange = (newTime) => {
    const formattedTime = dayjs(newTime).format("HH:mm");
    console.log(formattedTime); // Log the formatted time in HH:mm format
  };

  return (
    <Dialog open onClose={onClose} aria-labelledby="dialog-title" fullWidth>
      <Box sx={{ backgroundColor: "#E95252", color: "white", padding: 2 }}>
        <Typography variant="h6">Add/Remove Service</Typography>
      </Box>
      <DialogContent>
        <Stack spacing={2} margin={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            value={newServiceData.name}
            onChange={handleChange("name")}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Price"
            value={newServiceData.price}
            onChange={handleChange("price")}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={selectedTime}
              onChange={handleChange("duration")}
              renderInput={(props) => <TextField {...props} fullWidth />}
              style={{ marginTop: "20px", width: "200px" }}
              textFieldStyle={{ width: "100%" }}
              ampm={false} // Set ampm to false to display only hours and minutes
            />
          </LocalizationProvider>

          <TextField
            variant="outlined"
            label="Description"
            multiline
            rows={4}
            value={newServiceData.description}
            onChange={handleChange("description")}
          />
          {error && (
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          onClick={onClose}
          sx={{ borderColor: "#6B6767", color: "#6B6767", mr: 1 }}
        >
          Cancel
        </Button>
        <Button
          sx={{
            backgroundColor: "#E95252",
            color: "white",
            "&:hover": { backgroundColor: "#C74444" },
          }}
          variant="outlined"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddPopUp;
