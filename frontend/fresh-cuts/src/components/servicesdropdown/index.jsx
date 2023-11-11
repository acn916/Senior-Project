import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 320,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Servicesdropdown() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [service, setService] = React.useState('');
  const handleServiceChange = (event) => {
    setService(event.target.value);
  };

  const [stylist, setStylist] = React.useState('');
  const handleStylistChange = (event) => {
    setStylist(event.target.value);
  };
  return (
    <header>
      <Button onClick={handleOpen}>Open selection</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="service-select-label">Service</InputLabel>
                <Select
                  labelId="service-select-label"
                  id="service-select"
                  value={service}
                  label="Services"
                  onChange={handleServiceChange}
                >
                  <MenuItem value={1}>Baby Color</MenuItem>
                  <MenuItem value={2}>Bang Trim</MenuItem>
                  <MenuItem value={3}>Base Bump</MenuItem>
                  <MenuItem value={4}>Bleach Wash</MenuItem>
                  <MenuItem value={5}>Brazilian Blowout</MenuItem>
                  <MenuItem value={6}>Clean Up</MenuItem>
                  <MenuItem value={7}>Color</MenuItem>
                  <MenuItem value={8}>Color Touch Up</MenuItem>
                  <MenuItem value={9}>Color & Cut</MenuItem>
                  <MenuItem value={10}>Color Correction</MenuItem>
                  <MenuItem value={11}>Extension Fixed</MenuItem>
                  <MenuItem value={12}>Extension Installation</MenuItem>
                  <MenuItem value={13}>Highlights</MenuItem>
                  <MenuItem value={14}>Men's Haircut</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="stylist-select-label">Stylist</InputLabel>
                <Select
                  labelId="stylist-select-label"
                  id="stylist-select"
                  value={stylist}
                  label="Stylists"
                  onChange={handleStylistChange}
                >
                  <MenuItem value={1}>Kayla Nguyen</MenuItem>
                  <MenuItem value={2}>Nicole Mata</MenuItem>
                  <MenuItem value={3}>Victoria Saeturn</MenuItem>
                  <MenuItem value={4}>Sil Baron</MenuItem>
                  <MenuItem value={5}>Starrie Le</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" size="large" color="warning">Add +</Button>
            </Grid>
            <Grid item xs={6}>
              <Item>Added Services</Item>
            </Grid>
            <Grid item xs={6}>
              
            </Grid>
            <Grid item xs={3}>
              <Item>Sample Service 1</Item>
              <Item>2 Employees Selected</Item>
            </Grid>
            <Grid item xs={3}>
              <Item>Sample Service 2</Item>
              <Item>Victoria Saeturn</Item>
            </Grid>
            <Grid item xs={18}>
              
            </Grid>
            <Grid item xs={8}>
              
            </Grid>
            <Grid item xs={2}>
              <Button variant="outlined" size="large" color="warning">Cancel</Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" size="large" color="warning">Confirm</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </header>
  );
}

export default Servicesdropdown;