import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
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
    const [itemToEdit, setItemToEdit] = useState(null);
    const [action, setAction] = useState(null);

    const handleDeleteClick = (item) => {
        setDeleteSelectedItem(item);
        setDeleteOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setDeleteOpenDialog(false);
        setDeleteSelectedItem(null);
    };

    const handleConfirmDelete = async () => {
        await deleteUserFromDatabase(selectedItemToDelete)
        refresh();
        handleCloseDialog();
    };

    const handleOpenPopup = (item) => {
        setItemToEdit(item);
        setAction(item === null ? 'add' : 'edit');
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const handleFormSubmit = async (results) => {
        await addUserToDatabase(results);
        refresh();
        handleClosePopup();
    };

    const addUserToDatabase = async (userData) => {
        try {
            const response = await axios.post('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/client', {
                cognito_user_id: "fake",
                email: userData.email,
                first_name: userData.firstName,
                last_name: userData.lastName,
                phone: userData.phoneNumber,
                user_role: "Staff"
            })
        } catch (error) {
            console.error(error.response.data);
        }
    }

    const deleteUserFromDatabase = async (id) => {
        try {
            const response = await axios.delete('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/client', {
                data: { user_id: id }
            }); 
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    function refresh() {
        const apiUrl = 'https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff';

        setLoading(true);
        axios.get(apiUrl)
            .then((response) => {
                setStylists(response.data);
                setError(null);
            })
            .catch((error) => {
                setError('We are unable to load the data. Please try again later.');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        refresh();
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
                        justifyContent: "flex-end",
                        marginBottom: 1,
                    }}
                >
                    <IconButton
                        sx={{
                            color: "red",
                            backgroundColor: "white",
                            border: "2px solid red",
                            borderRadius: "10px",
                            padding: "2px",
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
                            border: 1,
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
                                sx={{
                                    "&:not(:last-child)": {
                                        borderBottom: 1,
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
