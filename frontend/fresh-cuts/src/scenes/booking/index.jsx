import React from 'react';
import {useState} from "react";
import { Grid, Box, Container, Button, Typography } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Servicedropdown from '../../components/servicesdropdown/index.jsx';
import "./Booking.css";

const Booking = () => {

  const [startDate, setStartDate] = useState(new Date());

  return (
    <Container maxWidth="95%">

        <Grid container spacing={2} style={{minHeight: "500px"}}>
          <Grid item xs={6}>

            <Grid container spacing={2}>
              <Grid item xs={7}>
                <h1 align="left" className= "selected-services"> Selected Services </h1>
              </Grid>

              <Grid item xs={4}>
                <div className="drop-down">
                  <Servicedropdown/>
                </div>
              </Grid>
            </Grid>

            <div className="selected-services-line"/>
          </Grid>

          <Grid item xs={6}>
            <h1 className="select-date" align="left"> Select Date </h1>
            <div className="select-date-line"/>
            <div className="date-picker">
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
            <h1 className="schedules" align="left"> Schedules </h1>
            <div className="schedules-line"></div>
          </Grid>
        </Grid>

    </Container>
  );
}

export default Booking;