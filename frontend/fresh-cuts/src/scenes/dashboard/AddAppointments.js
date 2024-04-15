import React, { useState, useEffect } from 'react';
import { Dialog, Slide, CircularProgress, Button, TextField, Typography, Box, Grid, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import axios from 'axios';

// Transition component for animating the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PopupForm = ({ open, handleClose, handleSubmit, data }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    stylist: '',
    service: '',
    notes: ''
  });
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    // Fetch services
    axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/service')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error Fetching Services:', error);
      });

    // Fetch stylists
    axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff')
      .then(response => {
        setStylists(response.data);
      })
      .catch(error => {
        console.error('Error Fetching Stylists:', error);
      });

    if (data) {
      setFormData({
        id: data.id || '',
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        startDate: data.startDate || '',
        startDate: data.startDate || '',
        endDate: data.endDate || '',
        service: data.service || '',
        notes: data.notes || '',
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
        <Typography variant="h6">Add Appointment</Typography>
      </Box>
      <form onSubmit={handleFormSubmit}>
        <Box padding={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
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
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                type="phone"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="service-label">Service</InputLabel>
                <Select
                  labelId="service-label"
                  id="service-select"
                  value={formData.service}
                  onChange={(e) => {
                    const { value } = e.target;
                    const selectedService = services.find(service => service.name === value);
                    if (selectedService) {
                      setFormData({
                        ...formData,
                        service: value,
                        service_id: selectedService.id
                      });
                    }
                  }}
                  name="service"
                  required
                >
                  {services.map(service => (
                    <MenuItem key={service.id} value={service.name}>{service.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="stylist-label">Stylist</InputLabel>
                <Select
                  labelId="stylist-label"
                  id="stylist-select"
                  value={formData.stylist}
                  onChange={(e) => {
                    const { value } = e.target;
                    const selectedStylist = stylists.find(stylist => stylist.id === value);
                    if (selectedStylist) {
                      setFormData({
                        ...formData,
                        stylist: selectedStylist.id // Set the stylist ID directly
                      });
                    }
                  }}
                  name="stylist"
                  required
                >
                  {stylists.map(stylist => (
                    <MenuItem key={stylist.id} value={stylist.id}>{stylist.first_name} {stylist.last_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="startDate"
                type="datetime-local"
                value={formData.startDate}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="endDate"
                type="datetime-local"
                value={formData.endDate}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleFormChange}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={handleClose} color="secondary" variant="outlined" sx={{ borderColor: '#6B6767', color: '#6B6767', mr: 1 }}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} variant="contained" sx={{ backgroundColor: loading ? undefined : '#E95252', color: 'white', '&:hover': { backgroundColor: '#C74444' } }}>
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
