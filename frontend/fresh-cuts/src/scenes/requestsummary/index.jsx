import React, {useState} from 'react'
import {
    Grid, Paper, TextField, FormControlLabel, FormGroup, Checkbox, Button, Typography, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Container
    } from '@mui/material';
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function Requestsummary() {
    const paperStyle={ maxHeight:'80vh', overflowY:'auto', width:'90%', maxWidth:'350px', margin:"30px auto"}
    const reqStyle={display: 'flex', flexDirection: 'column', width:'90%', maxWidth:'450px', padding:20, margin:"30px auto"}
    const [isChecked, setChecked] = useState(false);
    
    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const location = useLocation();
    const {stylist, date, time, service} = location.state;

    //const price = getPrice(service); //Will need a fetch request

    return (
        <>
        <Container>
            <Grid container direction="row">
                <Paper elevation={2} style={reqStyle}>
                    <Grid container direction="column">
                        <Typography variant='h5' margin='normal'>
                            Client Information
                        </Typography>
                        <TextField required id="reqsum-firstname" label="First Name" margin='normal'/>
                        <TextField required id="reqsum-lastname" label="Last Name" margin='normal'/>
                        <TextField required id="reqsum-phone" label="Phone Number" margin='normal'/>
                        <TextField required id="reqsum-email" label="Email" margin='normal'/>

                        <Typography variant='h5' margin='normal'> About your appointment</Typography>
                        <TextField
                        id="reqsum-specialrequest"
                        multiline
                        rows={4}
                        margin='normal'
                        label="Do you have any special requests or ideas to share with your service provider?(optional)"
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
                            <Button type='submit'
                                    style={{
                                        backgroundColor: "#a6a6a6",
                                        padding: "12px 36px",
                                        margin: "5px 10px"
                                    }}>
                                    <Link style={{textDecoration: "none", color: "white"}} to={'/Booking'}>Back</Link>
                            </Button>

                            <Button variant='Contained'
                                    type='submit'
                                    style={{
                                    backgroundColor: "#e95252",
                                    padding: "12px 36px",
                                    margin: "5px 10px"
                                    }}
                                    required
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
                            <ListItemText>{date}</ListItemText>
                            <ListItemText>
                                <Typography align="right">
                                    {time}
                                </Typography>
                            </ListItemText>
                        </ListItem>

                        <Divider/>
                        
                        <ListItem>
                            <ListItemAvatar><Avatar></Avatar></ListItemAvatar>
                            <ListItemText>{stylist}</ListItemText>
                            <ListItemText>
                                <Typography align="right">
                                    {service}
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
