import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { useEffect, useState } from "react";
import { Grid, Button, Typography, Paper } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom'; 

import axios from 'axios';

export default function Booking() {

    // Create a Date object representing today and format it for the selectedDate
    const today = new Date(); // Get today's date
    const year = today.getFullYear(); // Get the year
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month and pad with zero if needed
    const day = String(today.getDate()).padStart(2, '0'); // Get the day and pad with zero if needed
    // Create the initialSelectedDate string in 'YYYY-MM-DD' format
    const initialSelectedDate = `${year}-${month}-${day}`;

    // state variables for storing the retrieved services and stylist api calls
    const [servicesList, setServicesList] = useState([]);
    const [stylists, setStylists] = useState([]);

    // state variables for holding client input data
    const [selectedStylist, setSelectedStylist] = useState('');
    const [selectedServices, setSelectedServices] = useState('');
    const [selectedDate, setSelectedDate] = useState(initialSelectedDate);
    const [selectedTime, setSelectedTime] = useState('');

    // state variable holding all available time slots
    const [timeslots, setTimeslots] = useState([]);

    // state variables to hold timeslots for morning, afternoon, and evening
    const [morningSlots, setMorningSlots] = useState([]);
    const [afternoonSlots, setAfternoonSlots] = useState([]);
    const [eveningSlots, setEveningSlots] = useState([]);

    // used to display loading screen if still fetching data from DB
    const [isLoading, setIsLoading] = useState(false);

    // state variable to determine if time is selected
    const [isTimeSelected, setIsTimeSelected] = useState(false);

    // functions for fetching data from api
    const fetchStylists = async () => {
        try {
            const response = await fetch(`https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff`, { method: 'GET' });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setStylists(data);
        } catch (error) {
            console.error("Could not fetch stylists: ", error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await fetch(`https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/service`, { method: 'GET' });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setServicesList(data);
        } catch (error) {
            console.error("Could not fetch services: ", error);
        }
    };

    // use Effect to fetch the stylist list and services list
    useEffect(() => {
        setIsLoading(true);
        fetchStylists();
        fetchServices();
        setIsLoading(false);
    }, []);

    // functions are for displaying message is there are no available time slots
    function revealNoApt() {
        document.getElementById("noApt").innerHTML = "Sorry, there are no available appointments, please try another date.";
        document.getElementById("callUs").innerHTML = "Call to see if there are any last minute openings at (916) 451-1517";
    }

    function hideNoApt() {
        document.getElementById("noApt").innerHTML = "";
        document.getElementById("callUs").innerHTML = "";
    }

    // handler fuctions for the select service, select stylist and search button click

    const handleDateChange = (date) => {
        // Convert the selected date to a string in the format 'YY-MM-DD'
        const formattedDate = date.toISOString().split('T')[0];
        setSelectedDate(formattedDate);
    };

    const handleServiceChange = (event) => {
        setSelectedServices(event.target.value);
    };

    const handleStylistChange = (event) => {
        setSelectedStylist(event.target.value);
    };

    const dummySelectedService = "Haircut";
    const dummySelectedStylist = "John Doe";
    const dummySelectedDate = "2024-04-01";
    const dummySelectedTime = "10:00 AM";

    const navigate = useNavigate();
    const handleNavigateToSummary = (selectedTime) => {

       
        console.log(selectedDate)
        navigate('/summary', {
            state: {
                selectedService: dummySelectedService,
                selectedStylist: dummySelectedStylist,
                selectedDate: dummySelectedDate,
                selectedTime: dummySelectedTime // Pass the selected time as an argument
            }
        });
    };
    

    
    const handleTimeClick = (time) => {
        // Split the time string to separate hours and minutes
        const formattedDateTime = `${selectedDate} ${convertToMilitaryTime(time)}`
        navigate('/summary', {
            state: {
                selectedService: selectedServices,
                selectedStylist: selectedStylist,
                selectedDate: selectedDate,
                selectedTime: time, // Use the original time
                selectedDateTime: formattedDateTime // Use the formatted date and time
            }
        });
    };
    
    
    
    
    
    

    const handleSearchClick = async () => {

        // Create a new Date object from the selectedDate string
        const selectedDateTime = new Date(selectedDate);

        // Extract year, month, and day from the selected date
        const year = selectedDateTime.getFullYear().toString(); // Get last two digits of the year
        const month = ('0' + (selectedDateTime.getMonth() + 1)).slice(-2); // Add leading zero if needed
        const day = ('0' + selectedDateTime.getDate()).slice(-2); // Add leading zero if needed

        // Format the date to "YY-MM-DD" format
        const formattedDate = `${year}-${month}-${day}`;

        try {
            setIsLoading(true);
            const response = await axios.get(`https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/time_slots?service=${selectedServices}&stylist=${selectedStylist}&date=${formattedDate}`);
            console.log(response)

            // Organize timeslots into morning, afternoon, and evening
            const { morningSlots, afternoonSlots, eveningSlots } = organizeTimeSlots(response.data);
            setMorningSlots(morningSlots);
            setAfternoonSlots(afternoonSlots);
            setEveningSlots(eveningSlots);

            setIsLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setIsLoading(false);
        }

        
    };
    /*
    //Handle interaction with the removeTime() function based on availability
    if (morningSlots.length !== 0 && afternoonSlots.length !== 0 && eveningSlots !== 0) { //Reveal no available appointments if our list of times is empty
        hideNoApt();
    } else {
        revealNoApt();
    }
*/
    const paperStyle = { padding: 20, maxHeight: '10000px', maxWidth: '90%', margin: "10px auto" }

    return (
        <Paper elevation={2} style={paperStyle}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="stylist-select-label">Select a Stylist</InputLabel>
                        <Select
                            labelId="stylist-select-label"
                            id="stylist-select"
                            value={selectedStylist}
                            label="Stylists"
                            onChange={handleStylistChange}
                        >
                            {stylists.map((stylist) => (
                                <MenuItem key={stylist.id} value={stylist.id}>
                                    {stylist.first_name} {stylist.last_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="service-select-label">Select One or More Services</InputLabel>
                        <Select
                            labelId="service-select-label"
                            id="service-select"
                            value={selectedServices}
                            onChange={handleServiceChange}
                            input={<OutlinedInput label="Tag" />}
                        >
                            {servicesList.map((service) => (
                                <MenuItem key={service.id} value={service.id}>
                                    {service.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start Date"
                            value={today}
                            onChange={handleDateChange}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" fullWidth />
                            )}
                            format="yy-MM-dd" // Setting the desired format
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Button variant='contained'
                        style={{
                            backgroundColor: "#e95252",
                            padding: "16px 24px"
                        }}
                        onClick={handleSearchClick}>
                        <Typography color='white'>Search</Typography>
                    </Button>
                </Grid>
            </Grid>

            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <h2>Morning</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {morningSlots.map((time, index) => (
                            <Button
                                key={index}
                                variant='contained'
                                onClick={() =>handleTimeClick(time)}
                                style={{
                                    backgroundColor: "#e95252",
                                    width: "100px",
                                    padding: "10px 10px"
                                }}
                            >
                                <Typography color='white'>{time}</Typography>
                            </Button>
                        ))}
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <h2>Afternoon</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {afternoonSlots.map((time, index) => (
                            <Button
                                key={index}
                                variant='contained'
                                onClick={() =>handleTimeClick(time)}
                                style={{
                                    backgroundColor: "#e95252",
                                    width: "100px",
                                    padding: "10px 10px"
                                }}
                            >
                                <Typography color='white'>{time}</Typography>
                            </Button>
                        ))}
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <h2>Evening</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {eveningSlots.map((time, index) => (
                            <Button
                                key={index}
                                variant='contained'
                                onClick={() =>handleTimeClick(time)}
                                style={{
                                    backgroundColor: "#e95252",
                                    width: "100px",
                                    padding: "10px 10px"
                                }}
                            >
                                <Typography color='white'>{time}</Typography>
                            </Button>
                        ))}
                    </div>
                </Grid>
            </Grid>

            <h1 id="noApt" align="center" style={{ width: "70%", marginTop: 0 }}></h1><br />
            <p id="callUs" align="center" style={{ width: "70%", marginTop: 0 }}></p>
        </Paper>
    )
}

function organizeTimeSlots(slots) {
    const morningSlots = [];
    const afternoonSlots = [];
    const eveningSlots = [];

    slots.forEach((time) => {
        const [hour] = time.split(':');
        const hourNum = parseInt(hour);
        if (hourNum >= 0 && hourNum < 12) {
            morningSlots.push(convertToRegularTime(time));
        } else if (hourNum >= 12 && hourNum < 18) {
            afternoonSlots.push(convertToRegularTime(time));
        } else {
            eveningSlots.push(convertToRegularTime(time));
        }
    });

    return { morningSlots, afternoonSlots, eveningSlots };
}

function convertToRegularTime(militaryTime) {
    // Split the military time into hours and minutes
    const [hours, minutes] = militaryTime.split(':');

    // Convert hours to regular time format
    let regularHours = parseInt(hours);
    const meridiem = regularHours >= 12 ? 'PM' : 'AM';
    regularHours = regularHours % 12 || 12; // Convert 0 to 12 for 12-hour clock

    // Format the time with leading zero for single-digit minutes
    const regularTime = `${regularHours}:${minutes.padStart(2, '0')} ${meridiem}`;

    return regularTime;
}

function convertToMilitaryTime(timeString) {
    // Split the time string into hours, minutes, and meridiem (AM/PM)
    const [time, meridiem] = timeString.split(' ');

    // Split the time into hours and minutes
    const [hours, minutes] = time.split(':');

    // Convert hours to integer
    let militaryHours = parseInt(hours);

    // If meridiem is PM and hours are less than 12, add 12 hours to convert to military time
    if (meridiem === 'PM' && militaryHours < 12) {
        militaryHours += 12;
    }

    // If meridiem is AM and hours are 12, set hours to 0 to convert to military time
    if (meridiem === 'AM' && militaryHours === 12) {
        militaryHours = 0;
    }

    // Format military hours and minutes
    const militaryTimeString = `${militaryHours.toString().padStart(2, '0')}:${minutes}:00`;

    return militaryTimeString;
}
