import React, { useState } from "react";
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  IconButton,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PopupForm from "./components/EditStylistsPopup";
import ConfirmDeleteDialog from "./components/DeleteStylistsPopup";
import Setting from "../settings/index";

const SettingsPage = () => {
  // State to track the active page
  const [activePage, setActivePage] = useState("");
  const [names, setNames] = useState([
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Eve",
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Eve",
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Eve",
  ]);
  const [openDeleteDialog, setDeleteOpenDialog] = useState(false);
  const [selectedItemToDelete, setDeleteSelectedItem] = useState(null);

  const [popupOpen, setPopupOpen] = useState(false);
  const [formResults, setFormResults] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);

  const handleDeleteClick = (item) => {
    setDeleteSelectedItem(item);
    setDeleteOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setDeleteOpenDialog(false);
    setDeleteSelectedItem(null);
  };

  const handleConfirmDelete = () => {
    setNames(currentItems => currentItems.filter(i => i !== selectedItemToDelete));
    handleCloseDialog();
  };

  const handleOpenPopup = (item) => {
    setItemToEdit(item); // Set the item you want to edit
    setPopupOpen(true); // Open the PopupForm
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleFormSubmit = (results) => {
    setFormResults(results);
    setNames(currentNames => {
      const nameIndex = currentNames.findIndex(name => name === results.firstName);
      if (nameIndex >= 0) {
        // Name exists, update it
        return currentNames.map((name, index) => index === nameIndex ? results.firstName : name);
      } else {
        // Name doesn't exist, append it
        return [...currentNames, results.firstName];
      }
    });
  };  

  // Function to handle text click
  const handleTextClick = (page) => {
    setActivePage(page);
  };

  // Create a theme with Roboto font
  const theme = createTheme({
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{ height: "100vh" }}>
        <Grid item xs={2}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              pt: 3,
              bgcolor: "#FAFBFF",
            }}
          >
            <List>
              <ListItem>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      component="span"
                      variant="subtitle1" // Changed to subtitle1 to match the default primary text size
                      sx={{
                        display: "block",
                        color: "#E95252",
                        fontWeight: "bold",
                      }}
                    >
                      Settings
                    </Typography>
                  }
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        display: "block",
                        ml: 0.2,
                        color: "text.secondary",
                      }}
                    >
                      Site Settings
                    </Typography>
                  }
                />
              </ListItem>
              {/* Clickable Text for different settings pages */}
              <ListItemButton
                selected={activePage === "stylist"}
                sx={{
                  ".MuiTouchRipple-root": {
                    display: "none", // Disables the ripple effect
                  },
                }}
                onClick={() => handleTextClick("stylist")}
              >
                <ListItemText
                  primary="Add/Remove Stylist"
                  sx={{ textAlign: "center", color: "#052B74" }}
                />
              </ListItemButton>
              <ListItemButton
                selected={activePage === "service"}
                sx={{
                  ".MuiTouchRipple-root": {
                    display: "none", // Disables the ripple effect
                  },
                }}
                onClick={() => handleTextClick("service")}
              >
                <ListItemText
                  primary="Add/Remove Service"
                  sx={{ textAlign: "center", color: "#052B74" }}
                />
              </ListItemButton>
            </List>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Box
            sx={{
              bgcolor: "white",
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {/* Conditional rendering of the main content area */}
            {activePage === "stylist" && (
              <>
                <Typography variant="h4" gutterBottom fontWeight={700}>
                  Add/Remove Stylist
                </Typography>
                <Box sx={{ height: "16px" }} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: 697,
                      display: "flex",
                      justifyContent: "flex-end", // Align the button to the right
                      marginBottom: 1, // Add space between the icon and the list
                    }}
                  >
                    <IconButton
                      sx={{
                        color: "red", // Set the icon color to red
                        backgroundColor: "white", // Set the background color to white
                        border: "2px solid red", // Red border around the button
                        borderRadius: "10px", // Squircle-like border radius
                        padding: "2px",
                        // Adjust the size and padding as needed
                      }}
                      aria-label="add"
                      onClick={handleOpenPopup}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <List
                    sx={{
                      width: 697,
                      maxHeight: "637px",
                      overflow: "auto",
                      border: 1, // Apply a single border around the entire List
                      borderColor: "grey.300",
                      borderRadius: 2,
                      bgcolor: "background.paper",
                      padding: 0,
                    }}
                  >
                    {names.map((name, index) => (
                      <ListItem
                        key={index}
                        secondaryAction={
                          <>
                            <IconButton
                              edge="end"
                              aria-label="edit"
                              sx={{ mr: 1 }}
                              onClick={() =>
                                handleOpenPopup({
                                  firstName: name,
                                  lastName: name,
                                  email: name,
                                  phoneNumber: name,
                                })
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(name)}>
                              <DeleteIcon />
                            </IconButton>
                          </>
                        }
                        // Remove the marginBottom and border from individual ListItem
                        sx={{
                          "&:not(:last-child)": {
                            borderBottom: 1, // Only apply border to bottom if not the last item
                            borderColor: "grey.300",
                          },
                        }}
                      >
                        <ListItemText primary={name} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </>
            )}
            {activePage === "service" && (
              <>
                <Typography variant="h4" gutterBottom fontWeight={700}>
                  Add/Remove Service
                </Typography>
                <Box sx={{ height: "16px" }} />
                <Setting/>
              </>
            )}
            {activePage === "" && (
              <Typography variant="h4" gutterBottom fontWeight={700}>
                Select a setting to edit
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
      <PopupForm
        open={popupOpen}
        handleClose={handleClosePopup}
        handleSubmit={handleFormSubmit}
        data={itemToEdit}
      />
      <ConfirmDeleteDialog
        open={openDeleteDialog}
        handleClose={handleCloseDialog}
        handleConfirm={handleConfirmDelete}
      />
    </ThemeProvider>
  );
};

export default SettingsPage;