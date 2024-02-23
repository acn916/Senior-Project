import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography
    
    ,
    CircularProgress
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PopupForm from "./components/EditStylistsPopup";
import ConfirmDeleteDialog from "./components/DeleteStylistsPopup";

const StylistEditor = () => {
    const [stylists, setStylists] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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
        setStylists(currentItems => currentItems.filter(i => i !== selectedItemToDelete));
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
                return currentNames.map((name, index) => index === nameIndex ? results.firstName : name);
            } else {
                return [...currentNames, results.firstName];
            }
        });
    };

    useEffect(() => {
        const apiUrl = 'https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff';

        axios.get(apiUrl)
            .then((response) => {
                setStylists(response.data);
                console.log(response.data);
                setError(null);
            })
            .catch((error) => {
                setError('We are unable to load the data. Please try again later.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" width="100%">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" width="100%">
                {error}
            </Box>
        );
    }

    return (
        <>
            <Typography
            
            variant="h4" gutterBottom fontWeight={700}>
                Add/Remove Stylist
            </Typography
            
            >
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
                {stylists.length === 0 ? (
                    <Typography
                    sx={{
                        color: "#E95252",
                        fontWeight: "bold"
                    }}
                    >
                        No Stylists Found
                    </Typography>
                ) : (
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
                        {stylists.map((stylist, index) => (
                            <ListItem
                                key={stylist.id}
                                secondaryAction={
                                    <>
                                        <IconButton
                                            edge="end"
                                            aria-label="edit"
                                            sx={{ mr: 1 }}
                                            onClick={() =>
                                                handleOpenPopup({
                                                    firstName: stylist.first_name,
                                                    lastName: stylist.last_name,
                                                    email: stylist.email,
                                                    phoneNumber: stylist.phone,
                                                })
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(stylist.id)}>
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
                                <ListItemText primary={stylist.first_name} />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
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
        </>
    );
};

export default StylistEditor;
