import React, { useEffect, useState } from "react";
import { Grid, Box, Button, Typography, TextField} from '@mui/material';
import Modal from '@mui/material/Modal';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";


const Rebook = ({id, passedNames, service_id, scheduled_at, handleRebook}) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("John Doe"); {/*Doesn't work, will have to use name from appointment db when its uploaded*/}
  const [selectedService, setSelectedService] = useState(service_id);
  const [time, setTime] = useState(dayjs(scheduled_at));
  const [date, setDate] = useState(dayjs(scheduled_at));
  const [services, setServices] = useState([]);

  useEffect(() => { //
    axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/service')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
 
      setLoading(false);
      
  }, []);

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value)
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleBack = () => {
    setSelectedService(service_id);
    setName("John Doe"); {/*Doesn't work, will have to use name from appointment db when its uploaded*/}
    setTime(dayjs(scheduled_at));
    setDate(dayjs(scheduled_at));
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: "10px",
    boxShadow: 3,
  };

  const backStyle = {
    width: "45%",
    maxWidth: "225px",
    height: "45px",
    color: "#E95252",
    marginRight: "1%",
    border: "3px solid #E95252",
    borderRadius: "50px",
    boxShadow: 2,
    textTransform: 'none',
    fontSize: "20px"
  };

  const confirmStyle = {
    width: "45%",
    maxWidth: "225px",
    height: "45px",
    color: "white",
    backgroundColor: "#E95252",
    marginRight: "4%",
    borderRadius: "50px",
    boxShadow: 2,
    textTransform: 'none',
    fontSize: "20px",
    '&:hover': {
      backgroundColor: "#E95252"
    }
  };
  
  function checkFirstName(name){
    if (/\s/.test(name)){
      return name.substring(0, name.indexOf(' '));
    } else {
      return name;
    }
  }

  function checkLastName(name){
    if (/\s/.test(name)){
      return name.substring(name.indexOf(' ') + 1); 
    } else {
      return "";
    }
  }

  return (
    <>
      <Button onClick={handleOpen} sx={{color: "black", textTransform: "none", ':hover': {color: "blue"}}}> Rebook </Button>
      <Modal open={open} onClose={handleClose}>
          <Box sx={style}> 
            <Grid container justifyContent="flex-start" sx={{backgroundColor: "#E95252", color: "white", borderRadius: "9px 9px 0px 0px", p: 5, pt: 3, pb: 0}}>
              <Typography fontSize="25px" sx={{pb: 2}}>
                  Rebook Appointment
              </Typography>
            </Grid>

            <Grid container spacing={2} justifyContent="center" marginTop="20px" sx={{pl: 5, pr: 5}}>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography> Name </Typography>

                  {passedNames.map((name) => name.id == id ? (
                    <TextField
                    key={id}
                    fullWidth
                    defaultValue={name.first_name + " " +name.last_name}
                    onChange={handleNameChange}
                    sx={{backgroundColor: "#F2F2F2", boxShadow: 2}}
                  />
                  ): null)}
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography> Services </Typography>
                  <FormControl fullWidth sx={{backgroundColor: "#F2F2F2", boxShadow: 2}}>
                    <Select
                      value={selectedService}
                      onChange={handleServiceChange}
                    >
                    {services.map((service) => (
                      <MenuItem key={service.id} value={service.id}> {service.name} </MenuItem>
                    ))}
                    </Select>
                  </FormControl>

                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography> Date </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={date}
                      disablePast
                      onChange={(newDate) => setDate(newDate)}
                      slotProps={{ textField: { fullWidth: true } }}
                      sx={{backgroundColor: "#F2F2F2", boxShadow: 2}}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography> Time </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      value={time}
                      onChange={(newTime) => setTime(newTime)}
                      slotProps={{ textField: { fullWidth: true } }}
                      sx={{backgroundColor: "#F2F2F2", boxShadow: 2}}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
            </Grid>

            <Grid container justifyContent="flex-end" marginTop="50px" sx={{pb: 3}}>
              <Button onClick={() => {handleBack(); handleClose()}} sx={backStyle}> <KeyboardBackspaceIcon/> Back </Button>
              <Button onClick={() => 
                {handleRebook(
                  id, 
                  selectedService, 
                  dayjs(date).format('YYYY/MM/DD') + " " + dayjs(time).format('h:mm:ss'), 
                  checkFirstName(name), 
                  checkLastName(name)); 
                handleClose()}} 
                sx={confirmStyle}> 
                Rebook 
              </Button>
            </Grid>
          </Box>
      </Modal>
    </>
  );
}

export default Rebook;