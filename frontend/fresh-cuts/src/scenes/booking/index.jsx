import React from 'react';
import {useState} from "react";
import { Grid, Box, Container, Button, Typography } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
                <Button
                  sx={{marginLeft: 5, marginTop: 5.5, display: 'block', padding: '13px 35px',
                      color: 'white', bgcolor: '#E95252', ':hover': {bgcolor: '#E95252'}}}> 
                  + Add new
                </Button>
              </Grid>
            </Grid>

            <div style={{borderTop: "2px solid", color: "black", marginLeft: 50, maxWidth:"80%"}}></div>
          </Grid>

          <Grid item xs={6}>
            <h1 align="left" style={{marginLeft: 20, marginTop: 50}}> Select Date </h1>
            <div style={{borderTop: "2px solid", color: "black", marginLeft: 20, maxWidth:"80%"}}></div>
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