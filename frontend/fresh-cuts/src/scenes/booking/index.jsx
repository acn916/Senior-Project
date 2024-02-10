import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import {useState} from "react";
import { Grid, Box, Container, Button, Typography, Card, CardContent } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Stack } from '@mui/material';
//mport Servicedropdown from '../../components/servicesdropdown/index.jsx';
//import Editdropdown from '../../components/editdropdown/index.jsx';

const services = [
  'Baby Color',
  'Bang Trim',
  'Base Bump',
  'Bleach Wash',
  'Brazilian Blowout',
  'Clean Up',
  'Color',
  'Color Touch Up',
  'Color & Cut',
  'Color Correction',
  'Extension Fixed',
  'Extension Installation',
  'Highlights',
  'Men\'s Haircut'
];

/*const rows = [
  createData(1, 'Brazillian Blowout', 'Starrie Le'),
  createData(2, 'Cleanup', 'Sil Baron, Nicole Mata, Starrie Le'),
  createData(3, 'Color', 'Starrie Le'),
  createData(4, 'Color Touch Up', 'Victoria Saeturn, Nicole Mata'),
];*/

const Booking = () => {
  const [visible1, setVisible1] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [visible3, setVisible3] = useState(true);
  const [visible4, setVisible4] = useState(true);
  const toggleElement1 = () => {
    setVisible1((prev) => !prev);
  };
  const toggleElement2 = () => {
    setVisible2((prev) => !prev);
  };
  const toggleElement3 = () => {
    setVisible3((prev) => !prev);
  };
  const toggleElement4 = () => {
    setVisible4((prev) => !prev);
  };
  const [staffData, setStaffData] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [service, setService] = React.useState([]);
  const [addDisabled, setAddDisabled] = React.useState(true);
  const handleServiceChange = (event) => {
    const {
      target: { value },
    } = event;
    setService(typeof value === 'string' ? value.split(',') : value,);
    console.log(!value.length)
    setAddDisabled(!value.length)
  };
  const [stylist, setStylist] = React.useState('');
  const handleStylistChange = (event) => {
    setStylist(event.target.value);
  };
  const fetchData = async (staff_id) => {
    try {
      const response = await fetch(`https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/staff_availability/${staff_id}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data; // Return the fetched data
    } catch (error) {
      console.error("Could not fetch data: ", error);
      return null; // Return null or appropriate error handling
    }
  };
  const handleSearchClick = async () => {
    const data = await fetchData(stylist); // Assuming `stylist` holds the staff_id you want to fetch
    setStaffData(data); // Update the state with the fetched data
  };
  return (
    <Container maxWidth="100%">
        <Grid container spacing={2} style={{minHeight: "500px"}}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h1 align="left" style={{marginLeft: 50, marginTop: 50}}> Schedule an Appointment </h1>
              </Grid>
            </Grid>
            <div style={{borderTop: "2px solid", color: "black", marginLeft: 50, maxWidth:"80%"}}/>
            <Grid container>
              {visible1 && (
              <Card style={{ height: "30%", width: "10%", marginLeft: 50, marginTop: 20, backgroundColor: "#f2f2f2", display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                  <FormControl fullWidth>
                  <InputLabel id="stylist-select-label">Select a Stylist</InputLabel>
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
                </CardContent>
              </Card>
              )}
              {visible2 && (
              <Card style={{ height: "30%", width: "30%", marginLeft: 20, marginTop: 20, backgroundColor: "#f2f2f2", display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                  <FormControl fullWidth>
                    <InputLabel id="service-select-label">Select One or More Services</InputLabel>
                    <Select
                      labelId="service-select-label"
                      id="service-select"
                      name="service_select"
                      multiple
                      value={service}
                      label="Services"
                      onChange={handleServiceChange}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => selected.join(', ')}
                    >
                      {services.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={service.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
              )}
              {visible3 && (
              <Card style={{ height: "30%", width: "10%", marginLeft: 20, marginTop: 20, backgroundColor: "#f2f2f2", display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker 
                        label="Select a Date"
                        disablePast
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </CardContent>
              </Card>
              )}
              {visible4 && (
              <Card style={{ height: "30%", width: "10%", marginLeft: 20, marginTop: 20, backgroundColor: "#f2f2f2", display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                  <FormControl fullWidth>
                    <Button variant='Contained'
                      style={{
                          backgroundColor: "#e95252",
                          padding: "16px 24px"
                      }}
                      onClick={handleSearchClick}>
                      <Typography color='white'>Search</Typography>
                    </Button>
                  </FormControl>
                </CardContent>
              </Card>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{minHeight: "300px"}} marginLeft='50px'>
          <Stack flexDirection='column' margin='20px'>
          <Grid item xs={12}><Typography variant='h5'>Date Time</Typography></Grid>
          <Grid item xs={12}><Typography variant='h6'>Morning</Typography></Grid>
          <Grid item xs={12}>
            <Button variant='Contained'
                type='submit'
                style={{
                  backgroundColor: "#e95252",
                  padding: "10px 20px"
                }}>
                <Typography color='white'>AM</Typography>
              </Button>
          </Grid>

          <Grid item xs={12}><Typography variant='h6'>Afternoon</Typography></Grid>
          <Grid item xs={12}>
            <Button variant='Contained'
                type='submit'
                style={{
                  backgroundColor: "#e95252",
                  padding: "10px 20px"
                }}>
                <Typography color='white'>PM</Typography>
              </Button>
          </Grid>
          </Stack>
        </Grid>
    </Container>
  );
}

export default Booking;