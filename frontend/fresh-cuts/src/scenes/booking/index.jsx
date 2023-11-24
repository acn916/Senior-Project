import React from 'react';
import {useState} from "react";
import { Grid, Box, Container, Button, Typography } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Servicedropdown from '../../components/servicesdropdown/index.jsx';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
            <TableContainer>
              <Table sx={{marginLeft: 6, maxWidth:"80%"}} size="Small" aria-label="selected services table">
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