import React, { useState } from 'react';
import {
    Grid, Paper, TextField, FormControlLabel, FormGroup, Checkbox, Button, Typography, LinearProgress
} from '@mui/material';
import UserPool from "./UserPool.js";
import { Link } from 'react-router-dom';

function phoneFormat(input) {
    input = input.replace(/\D/g, '').substring(0, 10);
    var size = input.length;
    if (size > 0) { input = "(" + input }
    if (size > 3) { input = input.slice(0, 4) + ") " + input.slice(4) }
    if (size > 6) { input = input.slice(0, 9) + "-" + input.slice(9) }
    return input;
}

function reformatNumber(input) {
    let phoneNum = `+1${input.replace(/\D/g, '').substring(0, 10)}`;
    return phoneNum;
}

export default function Signup() {
    const [isChecked, setChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };
    const [isStylist, setIsStylist] = useState(false); // Updated state for the checkbox
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [formatNum, setFormatNum] = useState("");
    const [loading, setLoading] = useState(false);
    const paperStyle = { padding: 30, height: '620px', maxWidth: '350px' };
    //console.log(formatNum);
    const onSubmit = (event) => {
        event.preventDefault();

        setLoading(true)

        const attributes = [
            {
                Name: "given_name", // First Name attribute
                Value: firstName,
            },
            {
                Name: "family_name", // Last Name attribute
                Value: lastName,
            },
            {
                Name: "phone_number", // Phone Number attribute
                Value: formatNum,
            },
            {
                Name: "custom:user_role", // Custom role attribute
                Value: isStylist ? "Stylist" : "Customer",
            },

        ];
        UserPool.signUp(email, password, attributes, null, (err, data) => {
            if (err) {
                console.error(err);
                alert("Invalid information entered.")
            }
            else {
                // console.log(data);
                alert("Please check your email to verify your account.");
            }

        })
            .finally(() => {
                setLoading(false)
            });
    };

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

            <form onSubmit={onSubmit}>
                <Grid>
                    <div style={{ position: 'relative', maxWidth: '350px', margin: '10px auto' }}>
                        <Paper elevation={2} style={paperStyle}>
                            <Grid container direction="row" justifyContent="center" alignItems="center">
                                <h2>Sign Up</h2>
                            </Grid>

                            <TextField
                                required id="first-name-signup"
                                label="First Name"
                                margin="normal"
                                fullWidth
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                            />

                            <TextField
                                required id="last-name-signup"
                                label="Last Name"
                                margin="normal"
                                fullWidth
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />



                            <TextField
                                required
                                id="phone-number-signup"
                                label="Phone Number"
                                margin="normal"
                                value={phoneFormat(phoneNumber)}
                                onChange={(event) => {
                                    const inputNumber = event.target.value;
                                    setPhoneNumber(inputNumber)
                                    //console.log(phoneNumber); // This will log the updated state

                                    // Check if the input contains at least 10 digits
                                    if (inputNumber.replace(/\D/g, '').length >= 10) {
                                        const formattedNumber = reformatNumber(inputNumber);
                                        setFormatNum(formattedNumber);
                                        //console.log(formatNum);
                                    }

                                }}
                                fullWidth
                            />

                            <TextField
                                required id="email-address-signup"
                                label="Email Address"
                                margin="normal"
                                fullWidth
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />

                            <TextField
                                id="password-signup"
                                margin="normal"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                fullWidth required
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />

                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox color='default' size='small' onChange={handleCheckboxChange} />
                                    }
                                    label={
                                        <Typography variant='caption'>I agree to the Terms of Service and Privacy Policy.</Typography>
                                    }
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            type="checkbox"
                                            checked={isStylist}
                                            onChange={(event) => setIsStylist(event.target.checked)}
                                            color='default'
                                            size='small'
                                        />
                                    }
                                    label={<Typography variant='caption'>I am a stylist.</Typography>}
                                />
                            </FormGroup>

                            <Button variant='Contained'
                                type='submit'
                                style={{
                                    backgroundColor: "#e95252",
                                    padding: "12px 24px",
                                }}
                                fullWidth required
                                disabled={!isChecked}>
                                <Typography color='white'>Create an Account</Typography>
                            </Button>
                        </Paper>
                        {loading && (
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', padding: 0, margin: 0 }}>
                                <LinearProgress style={{ borderRadius: '0 0 4px 4px' }} />
                            </div>
                        )}
                    </div>
                </Grid>
            </form>
            <h1 />
        </>
    )
}