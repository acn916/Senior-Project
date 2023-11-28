import React from 'react'
import { Grid, Paper, TextField, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Passwordreset() {
    const paperStyle={padding:20, height:'350px', width:'90%', maxWidth:'350px', margin:"30px auto"}

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

                <TextField
                    required id="email-pwreset"
                    label="Email Address"
                    margin="normal"
                    fullWidth
                />

                <Button variant='Contained'
                        style={{
                        backgroundColor: "#e95252",
                        padding: "12px 24px"
                        }}
                        fullWidth required>
                    <Typography color='white'>Proceed</Typography>
                </Button>
            </Paper>
        </Grid>
        </>
    )
}
