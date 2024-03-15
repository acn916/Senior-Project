import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from './Account.js';
import { Navigate } from 'react-router-dom';

import {
  Grid, Paper, TextField, FormControlLabel, FormGroup, Checkbox, Button, Typography, Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext.js';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const {isLoggedIn, setIsLoggedIn, setUserRole, setName, setUserEmail, setUserPhone} = useContext(AuthContext)
  

  const { authenticate, getSession } = useContext(AccountContext);

  useEffect(() => {

    // this function will check if the user is "logged in" or has a "session"
    const checkAuthentication = async () => {
      try {
        const session = await getSession();
        if (session && session.user) {

          // if the user is logged in then save all of the user information inside of AuthContext
          // all this user information is coming form aws cogito (session).
          const role = session["custom:user_role"];
          const { given_name, family_name, email, phone_number } = session;

          // these mutator functions will change the value of the state variable inside AuthContext.
          setName(`${given_name} ${family_name}`); 
          setUserRole(role);
          setIsLoggedIn(true); 
          setUserEmail(email);
          setUserPhone(phone_number);
                   
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
       // console.error('Error checking authentication:', error);
      }
    };

    checkAuthentication();
  }, [getSession]);

  const onSubmit = (event) => {
    event.preventDefault();



    authenticate(email, password)
      .then((data) => {
        
        setUserEmail(email);
        setLoginError(false);
        setIsLoggedIn(true); 
      })
      .catch((err) => {
        //console.error("Failed to login", err);
        setLoginError(true);
      });
  };

  const paperStyle = { padding: 20, height: '350px', width: '90%', maxWidth: '350px', margin: "10px auto" };

  
  if (isLoggedIn) {
   
    return <Navigate to="/Dashboard" />;
  }

  return (
    <>
      <Grid container direction="row" justifyContent="right" alignItems="right">
        <Button
          variant='outlined'
          component={Link}
          to="/signup"
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

              {loginError && (
                <Typography color="error" variant="body2">
                  Incorrect Email or Password, please try again
                </Typography>
              )}

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

              <Stack direction='row' justifyContent='space-between' margin='normal'>
                <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked color='default' size='small' />}
                    label={<Typography variant='caption'>Remember Me</Typography>} />
                </FormGroup>

                <Button
                  href="#text-buttons"
                  component={Link}
                  to="/passwordreset"
                  style={{
                    textTransform: 'none',
                    color: "#a2a2a2"
                  }}
                >
                  <Typography variant='caption'>Forgot Password</Typography></Button>
              </Stack>

              <Button variant='contained'
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
