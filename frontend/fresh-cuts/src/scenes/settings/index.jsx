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

import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";
import dayjs from "dayjs";

import EditServicePopUp from "./components/EditServicePopUp";
import AddPopUp from "./components/AddPopUp";

function addService(id, name, price, description, duration) {
  return {
    id,
    name,
    price: typeof price === "number" ? price : 0,
    description,
    duration,
  };
}
// Call API

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
