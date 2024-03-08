import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Grid, Paper, TextField, FormControlLabel, FormGroup, Checkbox, Button, Typography, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Container
    } from '@mui/material';
import { Link } from 'react-router-dom'
import axios from "axios";

export default function Requestsummary() {
/* ********************* STYLES *********************** */
    const navigate = useNavigate();
    const paperStyle={ maxHeight:'80vh', overflowY:'auto', width:'90%', maxWidth:'350px', margin:"30px auto"}
    const reqStyle={display: 'flex', flexDirection: 'column', width:'90%', maxWidth:'450px', padding:20, margin:"30px auto"}
/* ********************* STATE VARIABLES *********************** */

    const [isChecked, setChecked] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [formatNum, setFormatNum] = useState("");
    const [email, setEmail] = useState("");
    const [notes, setNotes] = useState("");
    const [id_from_email, set_id_from_email] = useState(-1);

    //const [clientID, setClientID] = useState("");

/* ********************* HANDLER FUNCTIONS *********************** */
   
    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const fetchIDFromEmail = async () =>{
        try{
            const response = null; // api request to retrieve the id based on email.



        } catch (error) {
            console.error('Error fetching id:', error);
        }

    }

    const handleRequestSubmit = (event) =>{

        // check if the email the client enters is already in the db.
         // if (true) then do not create an account and add the appointment
         // else (false) then create an account first and the create the appointment

        // api call will

        if(id_from_email === -1 ){
            // create a user
            /*
            const newClient = [{
                email: email,
                first_name: firstName,
                last_name: lastName,
                phone: phoneNumber,
                user_role: "Client"
             }];
            */

            // dummy data
            const newClient = {
                cognito_user_id: "4234234",
                email: "johndo3e6@email.com",
                first_name: "John",
                last_name: "Doe",
                phone: "+19162222222",
                user_role: "Staff"
                
            };

            axios.post('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/client', newClient)
            .then(response =>{
                console.log(response);
            })
            .catch(error =>{
                console.error('Error adding user:', error);
            })

        }


        

        // dummy data. When props are passed to this then change the dummy data.
        const newAppointment = [{

            client_id: 1,
            staff_id: 5,
            service_id: 1,
            scheduled_at: "2024-02-20 08:00:00",
            status: "Pending",
            notes: "",
            confirmation_timestamp: "2024-02-20 08:00:00",
            cancellation_reason: "",

         }];

/*
         const newAppointment = [{

            client_id: id_from_email,
            staff_id: staffID,
            service_id: serviceID,
            scheduled_at: scheduled_at,
            status: "Pending",
            notes: notes,
            confirmation_timestamp: scheduled_at,
            cancellation_reason: "",

         }];


*/  
        axios.post('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointment', newAppointment)
            .then(response => {
                console.log(response);

                // only navigate if response was succesful
                navigate('/confirmation')

            })
            .catch(error => {
                console.error('Error adding appointment:', error);
            });
     
    }

    function phoneFormat(input) {
        input = input.replace(/\D/g,'').substring(0,10);
        var size = input.length;
        if (size>0) {input="("+input}
        if (size>3) {input=input.slice(0,4)+") "+input.slice(4)}
        if (size>6) {input=input.slice(0,9)+"-" +input.slice(9)}
        return input;
    }
    
    function reformatNumber(input){
        let phoneNum =  `+1${input.replace(/\D/g, '').substring(0, 10)}`;
        return phoneNum;
    }

    const handleFirstName = (event) => {
        const fname = event.target.value;
        setFirstName(fname);
    }

    const handleLastName = (event) => {
        const lname = event.target.value;
        setLastName(lname);
    }

    const handlePhoneNumber = (event) => {
        const inputNumber = event.target.value;
        setPhoneNumber(inputNumber);

        // Check if the input contains at least 10 digits
        if (inputNumber.replace(/\D/g, '').length >= 10) {
            const formattedNumber = reformatNumber(inputNumber);
            setFormatNum(formattedNumber);
            console.log(formatNum);
        }  
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleNotes = (event) => {
        setNotes(event.target.value);
    }



    return (
        <>
        <Container>
            <Grid container direction="row">
                <Paper elevation={2} style={reqStyle}>
                    <Grid container direction="column">
                        <Typography variant='h5' margin='normal'>
                            Client Information
                        </Typography>
                        <TextField required id="reqsum-firstname" label="First Name" margin='normal' onChange={handleFirstName}/>
                        <TextField required id="reqsum-lastname" label="Last Name" margin='normal' onChange={handleLastName}/>
                        <TextField required id="reqsum-phone" label="Phone Number" margin='normal' value={phoneFormat(phoneNumber)} onChange={handlePhoneNumber}/>
                        <TextField required id="reqsum-email" label="Email" margin='normal'onChange={handleEmail}/>

                        <Typography variant='h5' margin='normal'> About your appointment</Typography>
                        <TextField
                        id="reqsum-specialrequest"
                        multiline
                        rows={4}
                        margin='normal'
                        label="Do you have any special requests or ideas to share with your service provider?(optional)"
                        onChange={handleNotes}
                        />
                        
                        <Typography variant='h5' margin='normal'>Cancellation Policy</Typography>
                        <Typography margin='normal' marginBottom='20px'>
                            We are sorry to not see you for your appointment.
                            Please call our salon at (916) 451-1517 to cancel or move
                            an appointment so we can give your spot to someone on the waitlist.
                        </Typography>

                        <Typography variant='h5' margin='normal'>Fine Print</Typography>
                        <Typography>• Request Appointments are pending for Service Provider Acceptance.</Typography>
                        <Typography marginBottom='20px'>• Prices and Duration are starting point quotes.</Typography>
                        
                        <FormControlLabel 
                                control={
                                    <Checkbox 
                                        type="checkbox" 
                                        color='default' 
                                        size='small'
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />}

                                label={
                                <Typography variant='caption' margin='normal' marginBottom='8px'>
                                    By clicking Request, you agree to the Cancellation Policy and conditions of this business.
                                </Typography>}
                        />

                        <Grid container direction='row' justifyContent="space-between" alignItems="center">
                            <Link to="/booking">
                                <Button type='submit'
                                        style={{
                                            backgroundColor: "#a6a6a6",
                                            padding: "12px 36px",
                                            margin: "5px 10px"
                                        }}>
                                        <Typography color='white'>Back</Typography>
                                </Button>
                            </Link>
                            
                            
                            <Button 
                                variant='contained'
                                type='submit'
                                style={{
                                    backgroundColor: "#e95252",
                                    padding: "12px 36px",
                                    margin: "5px 10px"
                                }}
                                onClick={handleRequestSubmit} // Use onClick event handler here
                                disabled={!isChecked} // Disable if checkbox is not checked
                            >
                                <Typography color='white'>Request</Typography>
                            </Button>
                           
                        </Grid>
                    </Grid>
                </Paper>
                
                <Paper elevation={2} style={paperStyle}>
                    <Typography
                        variant='h5' 
                        margin='normal' 
                        padding='15px'
                        align='center' 
                        color='white'
                        style={{backgroundColor: "#e95252"}}>
                        Service Summary
                    </Typography>
                    
                    <List container="true">
                        <ListItem>
                            <ListItemText>Date</ListItemText>
                            <ListItemText>
                                <Typography align="right">
                                    Time
                                </Typography>
                            </ListItemText>
                        </ListItem>

                        <Divider/>
                        
                        <ListItem>
                            <ListItemAvatar><Avatar></Avatar></ListItemAvatar>
                            <ListItemText>Stylist</ListItemText>
                            <ListItemText>
                                <Typography align="right">
                                    Service Price
                                </Typography>
                            </ListItemText>
                        </ListItem>

                        <Divider/>
                        
                        <ListItem>
                            <ListItemText>Total</ListItemText>
                            <ListItemText>
                                <Typography align="right">
                                    Total Price
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Paper>
            </Grid>


        </Container>
        
        </>
    )
}
