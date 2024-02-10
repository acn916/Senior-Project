import React from "react";
import { useState } from "react";

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

const list = [
  {
    primaryText: "Setting",
    icon: <SettingsIcon />,
    secondaryText: "Site Setting",
    color: "#E95252",
  },
  {
    primaryText: "Add/Remove Stylist",
    color: "#052B74",
  },
  {
    color: "#052B74",
    primaryText: "Add/ Remove Service",
  },
];

function addService(service, price, description, duration) {
  return {
    service,
    price: typeof price === "number" ? price : 0,
    description,
    duration,
  };
}

function AddPopUp({ onSubmit, onClose }) {
  const [newServiceData, setNewServiceData] = useState({
    service: "",
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
    if (!newServiceData.service.trim()) {
      setError("Service name is required");
      return;
    }

    onSubmit(newServiceData);
    setNewServiceData({
      service: "",
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
            value={newServiceData.service}
            onChange={handleChange("service")}
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
    service: selectedRow ? selectedRow.service : "",
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
const rows = [
  addService(
    "Extension Move up",
    200.0,
    "Service requires consultation, before booking an appointment",
    "2 hours"
  ),
  addService(
    "Color Correction",
    150.0,
    "Service requires consultation, before booking an appointment",
    "3 hours"
  ),
  addService(
    "Full Highlights",
    200.0,
    "Traditional highlighting for hair birghtness",
    "2 hours"
  ),
  addService(
    "Men's Haircut",
    50.0,
    "Price varies based on client's hair density, length, and texture. Includes a wash and style",
    "2 hours"
  ),
];
const Setting = () => {
  const [rows, setRows] = useState([
    addService(
      "Extension Move up",
      200.0,
      "Service requires consultation, before booking an appointment",
      "2 hours"
    ),
    addService(
      "Color Correction",
      150.0,
      "Service requires consultation, before booking an appointment",
      "3 hours"
    ),
    addService(
      "Full Highlights",
      200.0,
      "Traditional highlighting for hair brightness",
      "2 hours"
    ),
    addService(
      "Men's Haircut",
      50.0,
      "Price varies based on client's hair density, length, and texture. Includes a wash and style",
      "2 hours"
    ),
  ]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [addServicePopupOpen, setAddServicePopupOpen] = useState(false);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handlePopupSubmit = (editedData) => {
    // Update the rows with the edited data
    const updatedRows = rows.map((row) =>
      row === selectedRow ? { ...row, ...editedData } : row
    );
    setRows(updatedRows);
    // Close the popup and reset the selectedRow state
    setOpen(false);
    setSelectedRow(null);
  };
  const handleAddServiceClick = () => {
    setAddServicePopupOpen(true);
  };

  const handleAddServicePopupSubmit = (newService) => {
    // Append the new service to the rows array
    setRows((prevRows) => [...prevRows, newService]);

    // Close the popup
    setAddServicePopupOpen(false);
  };

  const handleRemoveRow = (rowToRemove) => {
    // Filter out the row to be removed
    const updatedRows = rows.filter((row) => row !== rowToRemove);

    // Update the state with the new rows
    setRows(updatedRows);
  };

  return (
    <Container maxWidth="90" sx={{}}>
      <Grid container>
        
        <Grid item xs={6}>
          <Typography
            variant="h6"
            sx={{
              marginTop: "20px",
              marginLeft: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <strong>Add/Remove Service</strong>
            <IconButton onClick={handleAddServiceClick}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ marginTop: "20px", marginLeft: "20px" }}
          >
            <Table
              sx={{ minWidth: 800, minHeight: 400 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Service</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell>Description&nbsp;</TableCell>
                  <TableCell align="right">Duration&nbsp;</TableCell>
                  <TableCell align="right">&nbsp;</TableCell>
                  <TableCell align="right">&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.service}
                    </TableCell>
                    <TableCell>{row.price.toFixed(2)}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="right">{row.duration}</TableCell>
                    <TableCell align="right" sx={{ paddingRight: "4px" }}>
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
