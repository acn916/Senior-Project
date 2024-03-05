import React, { useEffect, useState } from "react";
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
import axios from "axios";

export const rows = [ 
  {id: 1,
  confirmation_timestamp:'02/10/2023',
  scheduled_at: "2023/09/17", 
  status:"Pending",
  service_id: 2,
  client_id: 1},

  {id: 2,
  confirmation_timestamp:'02/10/2023',
  scheduled_at: "2023/09/17", 
  status:"Pending",
  service_id: 15,
  client_id: 1},

  {id: 3,
  confirmation_timestamp:'02/10/2023',
  scheduled_at: "2023/09/17", 
  status:"Pending",
  service_id: 7,
  client_id: 1},

  {id: 4,
  confirmation_timestamp:'02/10/2023',
  scheduled_at: "2023/09/17", 
  status:"Pending",
  service_id: 10,
  client_id: 1},

  {id: 5,
  confirmation_timestamp:'02/10/2023', 
  scheduled_at: "2023/09/17", 
  status:"Pending",
  service_id: 27,
  client_id: 1},

  {id: 6,
  confirmation_timestamp:'02/10/2023',
  scheduled_at: "2023/09/17", 
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

 // const [requests, setRequests] = useState(rows.filter(test => test.status === "Pending")); //with data above (fake data)
  //const [services, setServices] = useState(rows2); //with data above (fake data)
  //const [clients, setClients] = useState(rows3); //with data above (fake data)
  
  const [requests, setRequests] = useState([]); //for get API (actual request data) //entire commented block is functional and will be used for database info
  const [services, setServices] = useState([]); //for get API (actual service data)
  const [clients, setClients] = useState([]); //for get API (actual client data) 
  const [loading, setLoading] = useState(true);

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
  }

  //changes status to Denied
  const handleDeny = (id) => {
    const currentRequestIndex = requests.findIndex((request) => request.id === id);
    const updatedRequest = {...requests[currentRequestIndex], status: "Cancelled"};
    const newRequests = [
      ...requests.slice(0, currentRequestIndex),
      updatedRequest,
      ...requests.slice(currentRequestIndex + 1)
    ];
    editAppointment(id, updatedRequest);

    setRequests(newRequests);
  }

  //deletes the row from the array
  const handleDelete = (id) => {
    handleDeny(id)
    setRequests(values => {
      return values.filter(request => request.id !== id)
    })
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

                {clients.map((client) => request.client_id === client.id ? (
                  <React.Fragment key={client.id}>
                    <TableCell align="left" sx={{color: "#2F65DD"}}>
                      <AccountCircleIcon sx={{marginBottom: -1}}/> {' ' + client.first_name + " " + client.last_name}
                    </TableCell>
                  </React.Fragment>
                ): null)}

                {services.map((service) => request.service_id === service.id ? (
                  <React.Fragment key={service.id}>
                    <TableCell align="left">{service.name}</TableCell>
                    <TableCell align="left">{'$'+ service.price}</TableCell>
                  </React.Fragment>
                ): null)}
                
                <TableCell align="left">{request.scheduled_at}</TableCell>
                <TableCell align="left">
                  <Accept id={request.id} handleConfirm={handleConfirm}/>
                  <span>|</span>
                  <Decline id={request.id} handleDelete={handleDelete}/>
                  <span>|</span>
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