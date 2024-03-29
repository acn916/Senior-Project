import React from "react";
import { useState } from "react";

import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
} from "@mui/material";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";

function EditServicePopUp({ selectedRow, onSubmit, onClose }) {
  const [editedData, setEditedData] = useState({
    id: selectedRow ? selectedRow.id : "",
    name: selectedRow ? selectedRow.name : "",
    price: selectedRow ? selectedRow.price : 0, // Initialize with a default value
    duration: selectedRow ? selectedRow.duration : "",
    description: selectedRow ? selectedRow.description : "",
  });

  const handleChange = (field) => (event) => {
    if (field === "duration") {
      console.log();
      console.log(typeof event.$d);
      const selectedDate = dayjs(event.$d);

      // Format the selected time as "HH:mm:ss"
      const formattedTime = selectedDate.format("HH:mm:ss");
      console.log(typeof formattedTime);
      setEditedData((prevData) => ({
        ...prevData,
        duration: formattedTime,
      }));
    } else {
      const value = event.target.value;
      setEditedData((prevData) => ({
        ...prevData,
        [field]: field === "price" ? parseFloat(value) || 0 : value,
      }));
    }
  };

  const [selectedTime, setSelectedTime] = useState(dayjs("HH:mm:00"));

  const handleSubmit = () => {
    // Submit the edited data
    console.log(editedData);
    onSubmit(editedData);
  };

  return (
    <Dialog open={Boolean(selectedRow)} onClose={onClose} fullWidth>
      <Box sx={{ backgroundColor: "#E95252", color: "white", padding: 2 }}>
        <Typography variant="h6">Edit Service</Typography>
      </Box>
      <DialogContent>
        <Stack spacing={2} margin={2}>
          <TextField
            variant="outlined"
            label="Service"
            value={editedData.name}
            onChange={handleChange("name")}
          />
          <TextField
            variant="outlined"
            label="Price"
            value={editedData.price}
            onChange={handleChange("price")}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={dayjs(editedData.duration, "HH:mm:ss")}
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
            value={editedData.description}
            onChange={handleChange("description")}
          />
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

export default EditServicePopUp;
