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
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
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

const names = [
  'Kayla Nguyen',
  'Nicole Mata',
  'Victoria Saeturn',
  'Sil Baron',
  'Starrie Le',
];

function Servicesdropdown() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [service, setService] = React.useState('');
  const handleServiceChange = (event) => {
    setService(event.target.value);
  };

  const [stylist, setStylist] = React.useState([]);
  const handleStylistChange = (event) => {
    const {
      target: { value },
    } = event;
    setStylist(typeof value === 'string' ? value.split(',') : value,);
  };
  return (
    <header>
      <Button 
        onClick={handleOpen} 
        sx={{
          marginLeft: 5, 
          marginTop: 6, 
          display: 'block',
          color: 'white', 
          bgcolor: '#E95252', 
          ':hover': {bgcolor: '#E95252'}}}
      >
        + Service
      </Button>
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
                  <MenuItem value={15}>None</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="stylist-select-label">Stylist</InputLabel>
                <Select
                  labelId="stylist-select-label"
                  id="stylist-select"
                  multiple
                  value={stylist}
                  label="Stylists"
                  onChange={handleStylistChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={stylist.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" size="large" style={{backgroundColor:'#E95252'}}>Add +</Button>
            </Grid>
            <Grid item xs={6}>
              <Item>Added Services</Item>
            </Grid>
            <Grid item xs={6}>
              
            </Grid>
            <Grid item xs={3}>
              <Item>Sample Service 1</Item>
              <Item></Item>
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
              <Button variant="outlined" size="large" style={{borderColor: '#E95252', color: '#E95252'}}>Cancel</Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" size="large" style={{backgroundColor:'#E95252'}}>Confirm</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </header>
  );
}

export default Servicesdropdown;