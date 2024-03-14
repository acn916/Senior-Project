import React, { useState } from "react";
import { Grid, Box, Button, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Accept = ({id, handleConfirm}) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 3,
    p: 5,

    '@media (max-width: 750px)': {
      width: 400
    },

    '@media (max-width: 550px)': {
      width: 200
    }
  };

  const backStyle = {
    width: "45%",
    height: "45px",
    color: "#E95252",
    marginRight: "10px",
    border: "3px solid #E95252",
    textTransform: 'none',
    fontSize: "20px"
  };

  const confirmStyle = {
    width: "45%",
    height: "45px",
    color: "white",
    backgroundColor: "#E95252",
    marginLeft: "10px",
    textTransform: 'none',
    fontSize: "20px",
    '&:hover': {
      backgroundColor: "#E95252"
    }
  };

  return (
    <>
      <Button onClick={handleOpen} sx={{color: "black", textTransform: "none", ':hover': {color: "green"}}}> Accept </Button>
      <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Grid container spacing={2} justifyContent="center">
              
              <Typography fontSize="28px" fontWeight="lighter">
                  Confirm Appointment
              </Typography>
            </Grid>

            <Grid container justifyContent="center" marginTop="20px">
              <Button onClick={handleClose} sx={backStyle}> <KeyboardBackspaceIcon/> Back </Button>
              <Button onClick={() => {handleConfirm(id); handleClose()}} sx={confirmStyle}> Confirm </Button>
            </Grid>

          </Box>
      </Modal>
    </>
  );
}

export default Accept;