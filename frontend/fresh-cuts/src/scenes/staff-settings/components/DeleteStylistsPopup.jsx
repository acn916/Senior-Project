import React, { useState } from 'react';
import { Dialog, Slide, Button, Typography, Box, CircularProgress } from '@mui/material';

// Transition component for animating the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDeleteDialog = ({ open, handleClose, handleConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirmClick = async () => {
    setLoading(true);
    try {
      await handleConfirm();
    } catch (error) {
      // Handle error if needed
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!loading) handleClose();
      }}
      TransitionComponent={Transition}
      keepMounted
    >
      <Box sx={{ backgroundColor: '#E95252', color: 'white', padding: 2 }}>
        <Typography variant="h6">Confirm Deletion</Typography>
      </Box>
      <Box padding={2}>
        <Typography>Are you sure you want to delete this item?</Typography>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button 
            onClick={() => {
              if (!loading) handleClose();
            }} 
            color="secondary" 
            variant="outlined" 
            sx={{ borderColor: '#6B6767', color: '#6B6767', mr: 1 }}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmClick} 
            variant="contained" 
            sx={{ 
              backgroundColor: '#E95252', 
              color: 'white', 
              '&:hover': { backgroundColor: '#C74444' } 
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Delete'}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;