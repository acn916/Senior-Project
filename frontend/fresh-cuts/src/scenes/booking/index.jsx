import React from 'react';
import {useState} from "react";
import { Grid, Box, Container, Button, Typography, Card, CardContent } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Servicedropdown from '../../components/servicesdropdown/index.jsx';
import Editdropdown from '../../components/editdropdown/index.jsx';

function createData(number, service, stylists, date) {
  return { number, service, stylists, date };
}

const rows = [
  createData(1, 'Brazillian Blowout', 'Starrie Le'),
  createData(2, 'Cleanup', 'Sil Baron, Nicole Mata, Starrie Le'),
  createData(3, 'Color', 'Starrie Le'),
  createData(4, 'Color Touch Up', 'Victoria Saeturn, Nicole Mata'),
];

const Booking = () => {

  const [startDate, setStartDate] = useState(new Date());

  return (
    <Container maxWidth="95%">
        <Grid container spacing={2} style={{minHeight: "500px"}}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <h1 align="left" style={{marginLeft: 50, marginTop: 50}}> Selected Services </h1>
              </Grid>

              <Grid item xs={4}>
                <Servicedropdown/>
              </Grid>
            </Grid>
            <div style={{borderTop: "2px solid", color: "black", marginLeft: 50, maxWidth:"80%"}}/>
            <Grid container>
              <Card style={{ height: "38%", maxWidth: "15%", marginLeft: 50, marginTop: 10, backgroundColor: "#f2f2f2", display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Men's Haircut
                  </Typography>
                  <Typography variant="h6" component="div">
                      Victoria Saeturn
                  </Typography>
                  <Editdropdown/>
                  <Button 
                    variant="contained" 
                    size="small" 
                    style={{width: 80, marginTop: "5%", borderColor: '#E95252', color: "white", backgroundColor: '#E95252'}}>
                    Cancel
                  </Button>
                </CardContent>
              </Card>
              <Card style={{ height: "38%", maxWidth: "15%", marginLeft: 50, marginTop: 10, backgroundColor: "#f2f2f2", display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Color
                  </Typography>
                  <Typography variant="h6" component="div">
                    Victoria Saeturn, Nicole Mata
                  </Typography>
                  <Editdropdown/>
                  <Button 
                    variant="contained" 
                    size="small" 
                    style={{width: 80, marginTop: "5%", borderColor: '#E95252', color: "white", backgroundColor: '#E95252'}}>
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          

          <Grid item xs={6}>
            <h1 align="left" style={{marginLeft: 20, marginTop: 50}}> Select Date </h1>
            <div style={{borderTop: "2px solid", color: "black", marginLeft: 20, maxWidth:"80%"}}/>
            <div style={{width: 230, marginLeft: 20, marginTop: 20}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  label="Select a Date"
                  disablePast
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{minHeight: "500px"}}>
          <Grid item xs={12}>
            <h1 align="left" style={{marginLeft: 50}}> Schedules </h1>
            <div style={{borderTop: "2px solid", color: "black", marginLeft: 50, maxWidth: "90%"}}></div>
          </Grid>
        </Grid>

    </Container>
  );
}

export default Booking;