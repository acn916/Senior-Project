import React from "react";
import { useState, useEffect } from "react";

import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
} from "@mui/material";
//import { TimeField } from "@mui/x-date-pickers/TimeField";

import { TimePicker } from '@mui/x-date-pickers/TimePicker';


import SettingsIcon from "@mui/icons-material/Settings";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";
import dayjs from "dayjs";

function addService(id, name, price, description, duration) {
  return {
    id,
    name,
    price: typeof price === "number" ? price : 0,
    description,
    duration,
  };
}

// **********Add popup start here

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
      console.log(formattedTime)
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

    const formattedTime = newTime.format("HH:mm:00");
      console.log("formattedTime:",formattedTime)
     //console.log(typeof formattedTime);
      setNewServiceData((prevData) => ({
        ...prevData,
        duration: formattedTime,
      }));

    //console.log(dayjs(newTime).format("HH:mm:ss"));
    setSelectedTime(newTime);
   
  
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
                value={dayjs(selectedTime, 'HH:mm:ss').toDate()} 
                onChange={handleTimeChange}
                renderInput={(props) => <TextField {...props} fullWidth/>}
                style={{ marginTop: "20px", width: "200px"}}
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

  const handleTimeChange = (newTime) => {

    const formattedTime = newTime.format("HH:mm:00");
      console.log("formattedTime:",formattedTime)
     //console.log(typeof formattedTime);
      setEditedData((prevData) => ({
        ...prevData,
        duration: formattedTime,
      }));

    //console.log(dayjs(newTime).format("HH:mm:ss"));
    setSelectedTime(newTime);
   
  
  };

  const handleSubmit = () => {
    // Submit the edited data
    console.log(editedData);
    onSubmit(editedData);

    // TODO
  };

  return (
    <Dialog open={Boolean(selectedRow)} onClose={onClose} fullWidth>
      <DialogTitle id="dialog-title">Edit Service</DialogTitle>
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
              value={dayjs(editedData.duration, 'HH:mm:ss').toDate()} 
              onChange={handleTimeChange}
              renderInput={(props) => <TextField {...props} fullWidth/>}
              style={{ marginTop: "20px", width: "200px"}}
              textFieldStyle={{ width: "100%" }} 
              ampm={false} // Set ampm to false to display only hours and minutes
          />

            {/*
            <TimeField
              label="Duration (hour/minute/seconds)"
              format="hh:mm:ss"
              value={dayjs(`2022-01-01T${editedData.duration}`, {
                format: "HH:mm:ss",
              })}
              onChange={handleChange("duration")}
            />
            */}
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

// Call API
// -----------------------------------------------------------------------------------------------------

const Setting = () => {
  const [rows, setRows] = useState([]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [addServicePopupOpen, setAddServicePopupOpen] = useState(false);
  const [services, setServices] = useState([]);

  const fetchServiceData = () => {
    const get_all_services_url =
      "https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/service";

    axios
      .get(get_all_services_url)
      .then((response) => {
        console.log(response);

        // Update the state with the new data
        setServices(response.data);

        // Iterate through the rows
        const mappedRows = response.data.map((service) => {
          return addService(
            service.id,
            service.name,
            service.price,
            service.description,
            service.duration
          );
        });

        setRows(mappedRows);
      })
      .catch((error) => {
        console.error("Failed to get all services: ", error);
      });
  };

  useEffect(() => {
    fetchServiceData();
  }, []);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handlePopupSubmit = (editedData) => {
    // Update the rows with the edited data
    let id = editedData.id;
    const updatedRows = rows.map((row) =>
      row === selectedRow ? { ...row, ...editedData } : row
    );

    //console.log("Here", editedData);

    // Make a PUT request to update the service on the server //
    const updateServiceUrl = `https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/service/${id}`;

    axios
      .put(updateServiceUrl, editedData)
      .then((response) => {
        console.log("Service updated successfully: ", response.data);
        fetchServiceData();
      })
      .catch((error) => {
        console.error("Failed to update service: ", error);
        console.error([editedData]);
      });

    // Close the popup and reset the selectedRow state
    setOpen(false);
    setSelectedRow(null);
  };
  const handleAddServiceClick = () => {
    setAddServicePopupOpen(true);
  };

  const handleAddServicePopupSubmit = (newService) => {
    const addServiceUrl = `https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/service`;
    //console.log("Format:", newService);

    axios
      .post(addServiceUrl, newService)
      .then(() => {
        // Fetch data after successful POST
        fetchServiceData();
      })
      .catch((error) => {
        console.error("Failed to add service: ", error);
      });

    // Close the popup
    setAddServicePopupOpen(false);
  };

  const handleRemoveRow = (rowToRemove) => {
    // Filter out the row to be removed
    const updatedRows = rows.filter((row) => row !== rowToRemove);
    let id = rowToRemove.id;

    const delServiceUrl = `https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/service/${id}`;
    axios
      .delete(delServiceUrl)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error deleting service from database", error);
      });
    // Update the state with the new rows
    setRows(updatedRows);
  };

  return (
    <Container maxWidth="90" sx={{}}>
      <Grid container>
        <Grid item xs={11}>
          <Typography
            variant="h6"
            sx={{
              marginTop: "20px",
              marginLeft: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              sx={{
                marginLeft: "auto",
                color: "red", // Set the icon color to red
                backgroundColor: "white", // Set the background color to white
                border: "2px solid red", // Red border around the button
                borderRadius: "10px", // Squircle-like border radius
                padding: "2px",
                // Adjust the size and padding as needed
              }}
              aria-label="add"
              onClick={handleAddServiceClick}
            >
              <AddIcon />
            </IconButton>
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              marginTop: "20px",
              marginLeft: "20px",
              height: "70vh",
            }}
          >
            <Table
              sx={{ minWidth: 800, minHeight: 400 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow key="table-header">
                  <TableCell>Service</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description&nbsp;</TableCell>
                  <TableCell>Duration&nbsp;</TableCell>
                  <TableCell>&nbsp;</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>
                      {row.price ? row.price.toFixed(2) : 0}
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.duration}</TableCell>
                    <TableCell sx={{ paddingRight: "4px" }}>
                      <IconButton onClick={() => handleEditClick(row)}>
                        <EditOutlinedIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right" sx={{ paddingRight: "4px" }}>
                      <IconButton onClick={() => handleRemoveRow(row)}>
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      {addServicePopupOpen && (
        <AddPopUp
          onSubmit={handleAddServicePopupSubmit}
          onClose={() => setAddServicePopupOpen(false)}
        />
      )}

      {open && (
        <EditServicePopUp
          selectedRow={selectedRow}
          onSubmit={handlePopupSubmit}
          onClose={() => {
            setOpen(false);
            setSelectedRow(null);
          }}
        />
      )}
    </Container>
  );
};
export default Setting;
