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

export const rows = [ 
  {id: 1,
  confirmation_timestamp:'02/10/2023 8:00:00',
  scheduled_at: "2023/09/17 9:00:00", 
  status:"Pending",
  service_id: 2,
  client_id: 1},

  {id: 2,
  confirmation_timestamp:'02/10/2023 8:00:00',
  scheduled_at: "2023/09/17 9:00:00", 
  status:"Pending",
  service_id: 15,
  client_id: 1},

  {id: 3,
  confirmation_timestamp:'02/10/2023 8:00:00',
  scheduled_at: "2023/09/17 9:00:00", 
  status:"Pending",
  service_id: 7,
  client_id: 1},

  {id: 4,
  confirmation_timestamp:'02/10/2023 8:00:00',
  scheduled_at: "2023/09/17 9:00:00", 
  status:"Pending",
  service_id: 10,
  client_id: 1},

  {id: 5,
  confirmation_timestamp:'02/10/2023 8:00:00', 
  scheduled_at: "2023/09/17 9:00:00", 
  status:"Pending",
  service_id: 27,
  client_id: 1},

  {id: 6,
  confirmation_timestamp:'02/10/2023 8:00:00',
  scheduled_at: "2023/09/17 9:00:00", 
  status:"Pending",
  service_id: 5,
  client_id: 2},

  {id: 7,
  confirmation_timestamp:'test',
  scheduled_at: "test", 
  status:"Confirmed",
  service_id: 7,
  client_id: 1},
]

export const rows2 = [
  {id: 2,
  name: "Hair Extensions",
  price: "200"},

  {id: 15,
  name: "Hair cut/color",
  price: "100"},

  {id: 7,
  name: "Men's haircut",
  price: "25"},

  {id: 10,
  name: "Highlight",
  price: "120"},

  {id: 27,
  name: "Blowout",
  price: "50"},

  {id: 5,
  name: "Hair Extension Move up",
  price: "200"},
]

export const rows3 = [
  {id: 1,
  first_name: "Sara",
  last_name: "Eastern"},

  {id: 2,
  first_name: "Test",
  last_name: "Testing"}
]

const Request = () => { 

  /*const [requests, setRequests] = useState(rows.filter(test => test.status === "Pending")); //with data above (fake data)
  const [services, setServices] = useState(rows2); //with data above (fake data)
  const [clients, setClients] = useState(rows3); //with data above (fake data)
  const [names, setNames] = useState(requests.map(request => ({
    id: request.id,
    client_id: request.client_id,
    first_name: findName(clients, request.client_id).first_name,
    last_name: findName(clients, request.client_id).last_name,
  })))*/
  
  const [requests, setRequests] = useState([]); //for get API (actual request data) //entire commented block is functional and will be used for database info
  const [services, setServices] = useState([]); //for get API (actual service data)
  const [clients, setClients] = useState([]); //for get API (actual client data) 
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
        axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointments')
          .then(response2 => {
             const pending_request = response2.data.filter(appointment => appointment.status === 'Pending')
             setNames(pending_request.map(request => ({
              id: request.id,
              client_id: request.client_id,
              first_name: response.data.find(client => client.id === request.client_id).first_name,
              last_name: response.data.find(client => client.id === request.client_id).last_name
            })))
          })
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
  
  /*function findName(array, otherID) {
    return array.find((value) => {
      return value.id == otherID;
    })
  } may be used in future*/

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
                  {names.map((name) => request.id == name.id ? (
                    <React.Fragment key={name.id}>
                      <AccountCircleIcon sx={{marginBottom: -1}}/> {' ' + name.first_name + " " + name.last_name}
                    </React.Fragment>
                  ): null)}
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