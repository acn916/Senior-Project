import React from "react";
import { useState, useEffect } from "react";

import {
  ListItem,
  List,
  ListItemText,
  ListItemIcon,
  Icon,
  Divider,
  Container,
  Grid,
  Paper,
  ListItemButton,
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
  DialogContentText,
  DialogActions,
  Stack,
  TextField,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";

function addService(id, name, price, description, duration) {
  return {
    id,
    name,
    price: typeof price === "number" ? price : 0,
    description,
    duration,
  };
}

function AddPopUp({ onSubmit, onClose }) {
  const [newServiceData, setNewServiceData] = useState({
    name: "",
    price: 0,
    duration: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setNewServiceData((prevData) => ({
      ...prevData,
      [field]: field === "price" ? parseFloat(value) || 0 : value,
    }));
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

  return (
    <Dialog open onClose={onClose} aria-labelledby="dialog-title" fullWidth>
      <DialogTitle id="dialog-title">Add New Service</DialogTitle>
      <DialogContent>
        <Stack spacing={2} margin={2}>
          <TextField
            variant="outlined"
            label="Service"
            value={newServiceData.name}
            onChange={handleChange("name")}
          />
          <TextField
            variant="outlined"
            label="Price"
            value={newServiceData.price}
            onChange={handleChange("price")}
          />
          <TextField
            variant="outlined"
            label="Hour"
            value={newServiceData.duration}
            onChange={handleChange("duration")}
          />
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
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="contained" color="error" onClick={onClose}>
          Cancel
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
    const value = event.target.value;
    setEditedData((prevData) => ({
      ...prevData,
      [field]: field === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = () => {
    // Submit the edited data
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
            value={editedData.service}
            onChange={handleChange("service")}
          />
          <TextField
            variant="outlined"
            label="Price"
            value={editedData.price}
            onChange={handleChange("price")}
          />
          <TextField
            variant="outlined"
            label="Hour"
            value={editedData.duration}
            onChange={handleChange("duration")}
          />
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
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="contained" color="error" onClick={onClose}>
          Cancel
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
              sx={{ marginLeft: "auto" }}
              onClick={handleAddServiceClick}
            >
              <AddCircleOutlineIcon />
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
