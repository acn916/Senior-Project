import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import {useState} from "react";
import { Grid, Container, Button, Typography, Card, CardContent} from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Stack } from '@mui/material';
import {Link} from "react-router-dom";

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

// Things to update
// - Resolve linking issues with date/time data linking

const Booking = () => {
  const [dataPackage, setDataPackage] = useState({ 
    stylist: "N/A", 
    date: "N/A", 
    time: "N/A", 
    service: "N/A"
  });

  function updatePackage(sty, dat, tim, ser) {
    setDataPackage({
      stylist: sty, 
      date: dat, 
      time: tim, 
      service: ser
    })
  }

  const [times, setTimes] = React.useState([
    {id: 900, name: "9:00 AM"},
    {id: 930, name: "9:30 AM"},
    {id: 1000, name: "10:00 AM"},
    {id: 1030, name: "10:30 AM"},
    {id: 1100, name: "11:00 AM"},
    {id: 1130, name: "11:30 AM"},
    {id: 1200, name: "12:00 PM"},
    {id: 1230, name: "12:30 PM"},
    {id: 1300, name: "1:00 PM"},
    {id: 1330, name: "1:30 PM"},
    {id: 1400, name: "2:00 PM"},
    {id: 1430, name: "2:30 PM"},
    {id: 1500, name: "3:00 PM"},
    {id: 1530, name: "3:30 PM"},
    {id: 1600, name: "4:00 PM"},
    {id: 1630, name: "4:30 PM"},
    {id: 1700, name: "5:00 PM"},
    {id: 1730, name: "5:30 PM"},
    {id: 1800, name: "6:00 PM"},
    {id: 1830, name: "6:30 PM"},
    {id: 1900, name: "7:00 PM"},
    {id: 1930, name: "7:30 PM"},
  ])

  function filterTimes(freeTimes) {
    let newTimes = times;
    let availability = 0;
    for(let x = 0; x < times.length; x++) { //For each possible time slot
      availability = 0;
      for(let y = 0; y < freeTimes.length; y++) { //For each available time
        if(times[x].id === freeTimes[y]) { //If the current time slot is available
          availability++; //Break since this time slot will not be removed
          break;
        }
      }
      if(availability === 0) {
        newTimes = newTimes.filter((l) => l.id !== times[x].id);
      }
    }
    setTimes(newTimes); //Assign the filtered list to our ui
  }

  function revealNoApt() {
    document.getElementById("noApt").innerHTML = "Sorry, there are no available appointments, please try another date.";
    document.getElementById("callUs").innerHTML = "Call to see if there are any last minute openings at (916) 451-1517";
  }

  function hideNoApt() {
    document.getElementById("noApt").innerHTML = "";
    document.getElementById("callUs").innerHTML = "";
  }

  const [startDate, setStartDate] = useState(new Date());
  const [service, setService] = React.useState([]);
  const [addDisabled, setAddDisabled] = React.useState(true);
  const handleServiceChange = (event) => {
    const {
      target: { value },
    } = event;
    setService(typeof value === 'string' ? value.split(',') : value,);
    updatePackage(dataPackage.stylist, dataPackage.date, dataPackage.time, value[0])
    setAddDisabled(!value.length)
  };
  const [stylist, setStylist] = React.useState('');
  const handleStylistChange = (event) => {
    const {
      target: { value },
    } = event;
    setStylist(value);
    console.log("Value is:" + value);
    updatePackage(value, dataPackage.date, dataPackage.time, dataPackage.service);
  };

  function handleTimeClick (newTime) {
    updatePackage(dataPackage.stylist, dataPackage.date, newTime, dataPackage.service);
    console.log(newTime);
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
    //const data = await fetchData(stylist); // Assuming `stylist` holds the staff_id you want to fetch
    const data = [900, 1000, 1500]; //Dummy data for testing purposes
    filterTimes(data); // Update the state with the fetched data

    if(data.length === 0) { //Reveal no available appointments if our list of available times is empty
      revealNoApt();
    }
    else {
      hideNoApt();
    }
  };
  
  return (
    <Container maxWidth="100%">
        <Grid container spacing={2} style={{minHeight: "500px"}}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h1 align="left" style={{marginLeft: 20, marginTop: 50}}> Schedule an Appointment </h1>
              </Grid>
            </Grid>
            <div style={{borderTop: "2px solid", color: "black", marginLeft: 20, maxWidth:"80%"}}/>
            <Grid container>
              <Card style={{ height: "30%", width: "10%", minWidth: "180px", marginLeft: 20, marginTop: 20, backgroundColor: "#f2f2f2", display: 'flex', flexDirection: 'column' }}>
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
                  <MenuItem value={"Kayla Nguyen"}>Kayla Nguyen</MenuItem>
                  <MenuItem value={"Nicole Mata"}>Nicole Mata</MenuItem>
                  <MenuItem value={"Victoria Saeturn"}>Victoria Saeturn</MenuItem>
                  <MenuItem value={"Sil Baron"}>Sil Baron</MenuItem>
                  <MenuItem value={"Starrie Le"}>Starrie Le</MenuItem>
                </Select>
                  </FormControl>
                </CardContent>
              </Card>
              <Card style={{ height: "30%", width: "30%", minWidth: "180px", marginLeft: 20, marginTop: 20, backgroundColor: "#f2f2f2", display: 'flex', flexDirection: 'column' }}>
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
              <Card style={{ height: "30%", width: "10%", minWidth:"146px", padding: 17, marginLeft: 20, marginTop: 20, backgroundColor: "#f2f2f2", display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                  <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      renderInput={(props) => (
                        <input
                          type="date"
                        />
                      )}
                    />
                  </LocalizationProvider>
                    
                  </FormControl>
                </CardContent>
              </Card>
              <Card style={{ height: "30%", width: "10%", minWidth:"180px", marginLeft: 20, marginTop: 20, backgroundColor: "#f2f2f2", display: 'flex', flexDirection: 'column' }}>
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
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{minHeight: "300px"}} marginLeft='20px'>
          <Stack flexDirection='column' marginTop='50px'>
            <Grid item xs={12}><Typography variant='h5' marginLeft='50px'>Appointment Time</Typography></Grid>
            <Grid item xs={8}>
              <div style={{display: 'flex'}}>
                <ul>
                  {
                    times.map((time) => {
                      return <Button variant='Contained'
                      id={time.id}
                      type='submit'
                      style={{
                        backgroundColor: "#e95252",
                        width: "120px",
                        padding: "10px 10px",
                        margin: "10px",
                      }}
                      >
                      
                      <Link  style={{textDecoration: "none", color: "white"}} to='/Summary' state={dataPackage} >{time.name}</Link>
                    </Button>
                    })
                  }
                </ul>
              </div>
              <script>
              document.getElementById("p1").innerHTML = "New text!";
              </script>
              <h1 id="noApt" align="center" style={{width: "70%", marginTop: 0}}> </h1><br/>
              <p id="callUs" align="center" style={{width: "70%", marginTop: 0}}> </p>
            </Grid>
          </Stack>
        </Grid>
        
    </Container>
  );
}
export default Booking;