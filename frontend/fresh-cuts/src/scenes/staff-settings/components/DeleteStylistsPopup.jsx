import React from 'react';
import { Dialog, Slide, Button, Typography, Box } from '@mui/material';

// Transition component for animating the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDeleteDialog = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
    >
      <Box sx={{ backgroundColor: '#E95252', color: 'white', padding: 2 }}>
        <Typography variant="h6">Confirm Deletion</Typography>
      </Box>
      <Box padding={2}>
        <Typography>Are you sure you want to delete this item?</Typography>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button onClick={handleClose} color="secondary" variant="outlined" sx={{ borderColor: '#6B6767', color: '#6B6767', mr: 1 }}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="contained" sx={{ backgroundColor: '#E95252', color: 'white', '&:hover': { backgroundColor: '#C74444' } }}>
            Delete
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;