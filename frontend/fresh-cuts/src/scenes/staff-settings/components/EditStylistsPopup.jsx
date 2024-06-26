import React, { useState, useEffect } from 'react';
import { Dialog, Slide, CircularProgress, Button, TextField, Typography, Box, Grid } from '@mui/material';

// Transition component for animating the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PopupForm = ({ open, handleClose, handleSubmit, data }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id || '',
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || '',
        cognito_user_id: data.cognito_user_id
      });
    }
  }, [data]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await handleSubmit(formData);
    } catch (error) {
      console.error('An error occurred during form submission:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
    >
      <Box sx={{ backgroundColor: '#E95252', color: 'white', padding: 2 }}>
        <Typography variant="h6">Add/Edit Stylist</Typography>
      </Box>
      <form onSubmit={handleFormSubmit}>
        <Box padding={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="first-name"
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                inputProps={{
                  'data-testid': 'firstnametextfield',
                }}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                inputProps={{
                  'data-testid': 'lastnametextfield',
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                type="email"
                inputProps={{
                  'data-testid': 'emailtextfield',
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleFormChange}
                inputProps={{
                  'data-testid': 'phonenumbertextfield',
                }}
                required
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={handleClose} color="secondary" variant="outlined" sx={{ borderColor: '#6B6767', color: '#6B6767', mr: 1 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              variant="contained"
              aria-label='save'
              sx={{
                backgroundColor: loading ? undefined : '#E95252',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#C74444'
                }
              }}>
              {loading ? (
                <CircularProgress
                  size={24}
                  sx={{ color: 'white' }}
                />
              ) : (
                'Save'
              )}
            </Button>
          </Box>
        </Box>
      </form>
    </Dialog>
  );
};

export default PopupForm;
