import React from 'react'
import { Grid, Paper, TextField, FormControlLabel, FormGroup, Checkbox, Button, Typography} from '@mui/material'
import { Link } from 'react-router-dom';

function phoneFormat(input) {
    input = input.replace(/\D/g,'').substring(0,10);
    var size = input.length;
    if (size>0) {input="("+input}
    if (size>3) {input=input.slice(0,4)+") "+input.slice(4)}
    if (size>6) {input=input.slice(0,9)+"-" +input.slice(9)}
    return input;
}

export default function Signup() {
    const paperStyle={padding:20, height:'620px', width:350, margin:"10px auto"}

    return (
        <>
            <Grid container direction="row" justifyContent="right" alignItems="right">
                <Button 
                component={Link}
                to="/Login"
                variant='outlined' 
                style={{
                    color: "#000000",
                    borderColor: "#000000",
                    borderWidth: "2px",
                    borderRadius: 0,
                    padding: "12px 48px",
                    margin: "20px 20px 20px 20px"
                }}>
                    Sign In
                </Button>
            </Grid>
            
            <Grid>
                <Paper elevation={2} style={paperStyle}>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <h2>Sign Up</h2>
                    </Grid>

                    <TextField
                        required id="firstname-required"
                        label="First Name"
                        margin="normal"
                        fullWidth
                    />

                    <TextField
                        required id="lastname-required"
                        label="Last Name"
                        margin="normal"
                        fullWidth
                    />

                    <TextField
                        required id="outlined-required"
                        label="Phone Number"
                        margin="normal"
                        onInput={(e) => { e.target.value = phoneFormat(e.target.value); }}
                        fullWidth
                    />

                    <TextField
                        required id="email-required"
                        label="Email Address"
                        margin="normal"
                        fullWidth
                    />

                    <TextField
                        id="outlined-password-input"
                        margin="normal"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        fullWidth required
                    />

                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked color='default' size='small'/>}
                                        label={<Typography variant='caption'>I agree to the Terms of Service and Privacy Policy.</Typography>}/>
                        <FormControlLabel control={<Checkbox defaultChecked color='default' size='small'/>}
                                        label={<Typography variant='caption'>I am a stylist.</Typography>}/>
                    </FormGroup>

                    <Button variant='Contained'
                            style={{
                            backgroundColor: "#e95252",
                            padding: "12px 24px"
                            }}
                            fullWidth required>
                        <Typography color='white'>Create an Account</Typography>
                    </Button>
                </Paper>
            </Grid>
        </>
    )
}
