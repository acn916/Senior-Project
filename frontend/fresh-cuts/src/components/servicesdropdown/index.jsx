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
import "./servicedropdown.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(number, service, stylists, date) {
  return { number, service, stylists, date };
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 480,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const names = [
  'Kayla Nguyen',
  'Nicole Mata',
  'Victoria Saeturn',
  'Sil Baron',
  'Starrie Le',
];

const rows = [
  createData(1, 'Brazillian Blowout', 'Starrie Le'),
  createData(2, 'Cleanup', 'Sil Baron, Nicole Mata, Starrie Le'),
  createData(3, 'Color', 'Starrie Le'),
  createData(4, 'Color Touch Up', 'Victoria Saeturn, Nicole Mata'),
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
  const [addDisabled, setAddDisabled] = React.useState(true);
  const handleStylistChange = (event) => {
    const {
      target: { value },
    } = event;
    setStylist(typeof value === 'string' ? value.split(',') : value,);
    console.log(!value.length)
    setAddDisabled(!value.length)
  };

  return (
    <header>
      <Button 
        className="mobile"
        onClick={handleOpen} 
        sx={{
          //marginLeft: 5, 
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
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="stylist-select-label">Stylist</InputLabel>
                <Select
                  labelId="stylist-select-label"
                  id="stylist-select"
                  name="stylist_select"
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
            <Grid item xs={10}></Grid>


            <Grid item xs={2}>
              <Button 
              disabled={addDisabled}
              variant="contained" 
              size="large" 
              style={{backgroundColor:'#E95252'}}>
              Add +
              </Button>
            </Grid>


            <Grid item xs={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} size="Small" aria-label="selected services table">
                <TableHead>
                  <TableRow>
                    <TableCell>Number</TableCell>
                    <TableCell align="center">Service</TableCell>
                    <TableCell align="center">Stylist(s)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.number}
                      </TableCell>
                      <TableCell align="center">{row.service}</TableCell>
                      <TableCell align="center">{row.stylists}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Grid>
            <Grid item xs={12}>
              
            </Grid>
            <Grid item xs={8}>
              
            </Grid>
            <Grid item xs={2}>
              <Button onClick = {handleClose} variant="outlined" size="large" style={{borderColor: '#E95252', color: '#E95252'}}>Cancel</Button>
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