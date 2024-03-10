import React, { useEffect, useState } from "react";
import { Grid, Button } from '@mui/material';
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
import axios from "axios";


const Request = () => { 
  
  const [requests, setRequests] = useState([]); 
  const [services, setServices] = useState([]); 
  const [clients, setClients] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [names, setNames] = useState([]);

  const fetchAppointments = async () =>  {
    try{
      const response = await axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointments');
      
      const pending_request = response.data.filter(appointment => appointment.status === 'Pending');
      setRequests(pending_request);
      
    } catch(error){
      console.error("Error fetching data:'", error);
      setLoading(false);
    }
  }

  const editAppointment = async (id, appointment) => {
    try{

      const response = axios.put(`https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointment/${id}`, [appointment])

    }catch(error){
      console.error("Error updating", error);
      setLoading(false);
    }
  }

  useEffect(() => { //
    axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/service')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
    
    axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/client')
      .then(response => {
        setClients(response.data);
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });

      fetchAppointments();
      setLoading(false);
      const intervalId = setInterval(fetchAppointments, 9000);

      return () => clearInterval(intervalId);  
  }, []);
  
  //changes status to Confirmed
  const handleConfirm = (id) => {
    const currentRequestIndex = requests.findIndex((request) => request.id === id);
    const updatedRequest = {...requests[currentRequestIndex], status: "Confirmed"};
    console.log("updated request", updatedRequest);
    const newRequests = [
      ...requests.slice(0, currentRequestIndex),
      updatedRequest,
      ...requests.slice(currentRequestIndex + 1)
    ];

    editAppointment(id, updatedRequest);
    setRequests(newRequests);
    handleDelete(id);
  }

  //changes status to Denied
  const handleDeny = (id) => {
    const currentRequestIndex = requests.findIndex((request) => request.id === id);
    const updatedRequest = {...requests[currentRequestIndex], status: "Cancelled"};
    console.log("updated request", updatedRequest);
    const newRequests = [
      ...requests.slice(0, currentRequestIndex),
      updatedRequest,
      ...requests.slice(currentRequestIndex + 1)
    ];

    editAppointment(id, updatedRequest);
    setRequests(newRequests);
    handleDelete(id);
  }

  //deletes the row from the array
  const handleDelete = (id) => {
    setRequests(values => {
      return values.filter(request => request.id !== id)
    })
    setNames(values => {
      return values.filter(name => name.id !== id)
    })
  }

  //updates the service id and date. Name is also updated (needs to be fixed to permanently update)
  const handleRebook = (id, service, dateTime, first_name, last_name) => {
    const currentRequestIndex = requests.findIndex((request) => request.id === id);
    const updatedRequest = {...requests[currentRequestIndex], service_id: service, scheduled_at: dateTime};
    const newRequests = [
      ...requests.slice(0, currentRequestIndex),
      updatedRequest,
      ...requests.slice(currentRequestIndex + 1)
    ];

    const currentNameIndex = names.findIndex((request) => request.id === id);
    const updatedName = {...names[currentNameIndex], first_name: first_name, last_name: last_name};
    const newNames = [
      ...names.slice(0, currentNameIndex),
      updatedName,
      ...names.slice(currentNameIndex + 1)
    ];

    editAppointment(id, updatedRequest);
    console.log("updated request", updatedRequest);
    console.log("updated request", updatedName);

    setRequests(newRequests);
    setNames(newNames);
  }

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
            {requests.map((request) => (
              <TableRow
                key={request.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row"> {request.confirmation_timestamp}</TableCell>

                <TableCell align="left" sx={{color: "#2F65DD"}}>

                  {
                    clients.map((client) => request.client_id == client.id ? (
                      <React.Fragment key={request.id}>
                        <AccountCircleIcon sx={{marginBottom: -1}}/> {' ' + client.first_name + " " + client.last_name}
                      </React.Fragment>
                    ):(
                      null
                    ))
                  }

                </TableCell>
                  
                <TableCell align="left">
                  {services.map((service) => request.service_id == service.id ? (
                    <React.Fragment key={service.id}>
                      {service.name}
                    </React.Fragment>
                  ): null)}
                </TableCell>
                    
                <TableCell align="left">
                  {services.map((service) => request.service_id == service.id ? (
                    <React.Fragment key={service.id}>
                      {'$'+ service.price}
                    </React.Fragment>
                  ): null)}
                </TableCell>
                
                <TableCell align="left">{request.scheduled_at}</TableCell>
                <TableCell align="left">
                  <Accept id={request.id} handleConfirm={handleConfirm}/>
                  <span>|</span>
                  <Decline id={request.id} handleDeny={handleDeny}/>
                  <span>|</span>
                  <Rebook 
                    id={request.id} 
                    passedNames={names}
                    service_id={request.service_id}
                    scheduled_at={request.scheduled_at}
                    handleRebook={handleRebook}
                  />
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