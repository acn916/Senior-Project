import React from 'react';
import { Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Accept from './Accept.jsx';
import Decline from './Decline.jsx';
import Rebook from './Rebook.jsx';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function createData(bookingDate, name, service, price, appointmentDate, id) {
  return { bookingDate, name, service, price, appointmentDate, id };
}

const Request = () => {

  const rows = [
    createData('02/10/2023', "Sara Eastern", "Hair Exensions", "$200", "2023/09/17", 1),
    createData('02/11/2023', "Sara Eastern", "Hair cut/color", "$100", "2023/09/17", 2),
    createData('02/14/2023', "Sara Eastern", "Men's hair cut", "$25", "2023/09/17", 3),
    createData('02/15/2023', "Sara Eastern", "Highlight", "$120", "2023/09/17", 4),
    createData('02/15/2023', "Sara Eastern", "Blowout", "$50", "2023/09/17", 5),
    createData('02/15/2023', "Sara Eastern", "Hair Extension Move up", "$200", "2023/09/17", 6),
  ];

  return (
    <Grid>
      <h1 style={{marginTop: "40px", marginLeft: "2%"}}> Appointment Request </h1>
      <TableContainer sx={{boxShadow: 2, maxWidth: "92.5%", marginTop: "5%", marginBottom: "5%", marginLeft: "3.75%"}}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{backgroundColor: "#F5F5F5", boxShadow: 1}}>
              <TableCell align= "left" sx={{fontWeight: "bold"}}>Booking Date</TableCell>
              <TableCell align="left" sx={{fontWeight: "bold"}}>Guest Name</TableCell>
              <TableCell align="left" sx={{fontWeight: "bold"}}>Service</TableCell>
              <TableCell align="left" sx={{fontWeight: "bold"}}>Starting Price</TableCell>
              <TableCell align="left" sx={{fontWeight: "bold"}}>Appointment Date</TableCell>
              <TableCell align="left" sx={{fontWeight: "bold"}}>Accept / Decline / Rebook</TableCell>
            </TableRow>
          </TableHead>


          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row"> {row.bookingDate}</TableCell>
                <TableCell align="left" sx={{color: "#2F65DD"}}><AccountCircleIcon sx={{marginBottom: -1}}/>{' '}{row.name}</TableCell>
                <TableCell align="left">{row.service}</TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">{row.appointmentDate}</TableCell>
                <TableCell align="left">
                  <Accept/>
                  <span> | </span>
                  <Decline/>
                  <span> | </span>
                  <Rebook/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
    </Grid>
  );
}

export default Request;