import React, { useState } from "react";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import Pool from "../login/UserPool";

export default function Passwordreset() {
  const paperStyle = {
    padding: 20,
    height: "350px",
    width: "90%",
    maxWidth: "350px",
    margin: "30px auto",
  };

  const paperStyle2 = {
    padding: 20,
    height: "420px",
    width: "90%",
    maxWidth: "350px",
    margin: "30px auto",
  };

  const navigate = useNavigate();
  const [error, setError] = useState("");
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

  const resetPassword = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Incorrect Password or code, please try again");

      console.error("Passwords are not the same");
      return;
    }

    // Trim leading and trailing spaces from the code
    const trimmedCode = code.trim();

    getUser().confirmPassword(trimmedCode, password, {
      onSuccess: (data) => {
        console.log("onSuccess:", data);
        navigate("/Login");
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
      },
    });
  };

  return (
    <div>
      {stage === 1 && (
        <>
          <Grid>
            <Paper elevation={2} style={paperStyle}>
              <Button
                variant="Contained"
                size="small"
                component={Link}
                to="/Login"
                style={{
                  padding: "5px 5px",
                }}
              >
                <Typography variant="caption">Back to Login</Typography>
              </Button>

              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <h2>Password Reset</h2>
              </Grid>

              <Typography align="center">
                Enter your email to get a link to get back into your account.
              </Typography>
              <form onSubmit={sendCode}>
                <TextField
                  required
                  id="email-pwreset"
                  label="Email Address"
                  margin="normal"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button
                  type="submit"
                  variant="Contained"
                  style={{
                    backgroundColor: "#e95252",
                    padding: "12px 24px",
                  }}
                  fullWidth
                  required
                >
                  <Typography color="white">Proceed</Typography>
                </Button>
              </form>
            </Paper>
          </Grid>
        </>
      )}

      {stage === 2 && (
        <>
          <Grid>
            <Paper elevation={2} style={paperStyle2}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <h2>Password Reset</h2>
              </Grid>

              <Typography marginTop="10px"></Typography>
              <form onSubmit={resetPassword}>
                {error && (
                  <Typography color="error" align="center">
                    {error}
                  </Typography>
                )}
                <TextField
                  required
                  id="pw-code"
                  label="Enter code"
                  margin="normal"
                  fullWidth
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                />

                <TextField
                  required
                  id="pw-reset"
                  label="New Password"
                  margin="normal"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                <Typography marginTop="10px">
                  Must match new password:
                </Typography>

                <TextField
                  required
                  id="pw-reset-confirm"
                  label="Confirm new password"
                  margin="normal"
                  type="password"
                  fullWidth
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />

                <Button
                  type="submit"
                  variant="Contained"
                  style={{
                    backgroundColor: "#e95252",
                    padding: "12px 24px",
                  }}
                  fullWidth
                  required
                >
                  <Typography color="white">Proceed</Typography>
                </Button>
              </form>
            </Paper>
          </Grid>
        </>
      )}
    </div>
  );
}
