import React, { useState, useContext} from 'react'
import { AccountContext } from "./Account";

import {
Grid, Paper, TextField, FormControlLabel, FormGroup, Checkbox, Button, Typography, Stack
} from '@mui/material'
import { Link } from 'react-router-dom'


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
    const { authenticate } = useContext(AccountContext)

    const onSubmit = (event) => {
        event.preventDefault(); 

        authenticate(email, password)
        .then((data) => {
            console.log("Logged in!", data);
        })
        .catch((err) => {
            console.error("Failed to login", err);
        });
    };


    const paperStyle={padding:20, height:'350px', width:350, margin:"10px auto"}

    return (
        <>
            <Grid container direction="row" justifyContent="right" alignItems="right">
                <Button 
                    variant='outlined'
                    component={Link}
                    to="/Signup" 
                    style={{
                        color: "#000000",
                        borderColor: "#000000",
                        borderWidth: "2px",
                        borderRadius: 0,
                        padding: "12px 48px",
                        margin: "20px 20px 20px 20px"
                    }}>
                    Sign Up
                </Button>
            </Grid>
            
            <div>
                <form onSubmit={onSubmit}>
                    <Grid>
                        <Paper elevation={2} style={paperStyle}>
                            <Grid container direction="row" justifyContent="center" alignItems="center">
                                <h2>Log In</h2>
                            </Grid>

                            <TextField
                                required id="email-login"
                                label="Email Address"
                                margin="normal"
                                fullWidth
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                />

                            <TextField
                                id="password-login"
                                margin="normal"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                fullWidth required
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                />

                            <Stack direction='row' spacing={12} margin="normal">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked color='default' size='small'/>}
                                                label={<Typography variant='caption'>Remember Me</Typography>}/>
                            </FormGroup>

                            <Button 
                                href="#text-buttons" 
                                component={Link}
                                to="/Passwordreset"
                                style={{
                                    textTransform: 'none',
                                    color: "#a2a2a2"
                                }}
                            >
                                <Typography variant='caption'>Forgot Password</Typography></Button>
                            </Stack>

                            <Button variant='Contained'
                                    style={{
                                        backgroundColor: "#e95252",
                                        padding: "12px 24px"
                                    }}
                                    fullWidth required type="submit">
                                <Typography color='white'>Proceed</Typography>
                            </Button>
                        </Paper>
                    </Grid>
                </form>
            </div>
        </>
    )
}


