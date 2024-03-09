import React, { useState } from 'react'
import { Grid, Paper, TextField, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import Pool from "../login/UserPool";

export default function Passwordreset() {
    const paperStyle={padding:20, height:'350px', width:'90%', maxWidth:'350px', margin:"30px auto"}

    const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const getUser = () => {
      return new CognitoUser({
        Username: email.toLowerCase(),
        Pool,
      });
    };


    const sendCode = (event) => {
        event.preventDefault();
    
        getUser().forgotPassword({
          onSuccess: (data) => {
            console.log("onSuccess:", data);
          },
          onFailure: (err) => {
            console.error("onFailure:", err);
          },
          inputVerificationCode: (data) => {
            console.log("Input code:", data);
            setStage(2);
          },
        });
      };


    return (
        <>
        <Grid>
            <Paper elevation={2} style={paperStyle}>
                 <Button 
                    variant='Contained' 
                    size='small'
                    component={Link}
                    to="/Login"
                    style={{
                        padding: "5px 5px"
                    }}>
                    <Typography variant='caption'>Back to Login</Typography>
                </Button>
                
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <h2>Password Reset</h2>
                </Grid>

                <Typography align='center'>Enter your email to get a link to get back into your account.</Typography>
                <form onSubmit={sendCode}>

                    <TextField
                        required id="email-pwreset"
                        label="Email Address"
                        margin="normal"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />

                    <Button type="submit" variant='Contained'
                            style={{
                                backgroundColor: "#e95252",
                                padding: "12px 24px"
                            }}
                            fullWidth required>
                        <Typography color='white'>Proceed</Typography>
                    </Button>
                </form>
            </Paper>
        </Grid>
        </>
    )
}


