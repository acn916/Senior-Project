import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const CustomStyledLayout = (props) => {
  const { appointmentData, onFieldChange, ...restProps } = props;
  const [clients, setClient] = useState([]);
  const [stylist, setStylist] = useState([]);
  const [selectedStylist, setSelectedStylist] = useState('');
  const [selectedServices, setSelectedServices] = useState('');
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  

  const [name, setName] = useState("");
  const [service, setService] = useState("");

  
/*
  const services = [
    'Haircut',
    'Coloring',
    'Styling',
    'Extensions',
    'Perm',
    // Add more services as needed
  ];

  */

  useEffect(() =>{
    axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/service')
    .then(response => {
     // console.log(response);
      setServices(response.data);
      setLoading(false);
      console.log('Services:', response.data);

     for(let i = 0; i < response.data.length; i++){

          if(response.data[i].id == appointmentData.service_id){
              setSelectedServices([response.data[i].name]);
              console.log(selectedServices);
          }

     }
      
    })
    .catch(error => {
      console.error('Error Fetching Data', error);
      setLoading(false);
    });

    axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff')
    .then(response => {
        setStylist(response.data);
        setLoading(false);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
    });

    axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/client')
    .then(response => {
       // console.log(response);
        setClient(response.data);

        for(let i = 0; i < response.data.length; ++i){
           // console.log(response.data[i]);

            if(response.data[i].id == appointmentData.title){
                setName(response.data[i].first_name + " " + response.data[i].last_name );
                console.log(name);
            }
            
        }
        
        setLoading(false);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
    });

    setLoading(false);

  }, []);
 

 
  const handleServiceChange = (event) => {
    const selectedServiceId = event.target.value;
    setSelectedServices(selectedServiceId);
    // Call onFieldChange to update the appointmentData with the selected service_id
    onFieldChange({ service_id: selectedServiceId });
  };

  return (
    <Box marginLeft={'20px'}>
      <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '16px', marginTop: '16px' }}>
        Details
      </Typography>
      <div style={{ marginBottom: '16px', marginTop: "16px" }}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          value={appointmentData.name || ''}
          onChange={(e) => onFieldChange({ name: e.target.value } )}
        />
      </div>

      <div style={{ marginBottom: '16px', marginTop: "16px" }}>
        <TextField
          id="client"
          label="Client"
          variant="outlined"
          fullWidth
          value={appointmentData.client_id || ''}
          onChange={(e) => onFieldChange({ client_id: e.target.value })}
        />
      </div>

      <Box display="flex" alignItems="center">
        <div style={{ marginRight: '16px', flex: '1' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Start Date"
              value={appointmentData.startDate || null}
              onChange={(date) => onFieldChange({ startDate: date })}
              renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
            />
          </LocalizationProvider>
        </div>

        <div style={{ flex: '1' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="End Date"
              value={appointmentData.endDate || null}
              onChange={(date) => onFieldChange({ endDate: date })}
              renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
            />
          </LocalizationProvider>
        </div>
      </Box>

      

      <div style={{ marginBottom: '16px', marginTop: "16px" }}>
        <TextField
          id="stylist"
          label="Stylist"
          variant="outlined"
          fullWidth
          value={appointmentData.staff_id || ''}
          onChange={(e) => onFieldChange({ staff_id: e.target.value })}
        />
      </div>

      <div style={{ marginTop: '16px' }}>
        <FormControl fullWidth>
          <InputLabel id="services-label">Select Services</InputLabel>
          <Select
            labelId="services-label"
            id="services"
            value={selectedServices}
            onChange={handleServiceChange}
            label="Select Service"
          >
          {services.map((service) => (
            <MenuItem key={String(service.id)} value={String(service.name)}>
              {String(service.name)}
            </MenuItem>
          ))}
            {services.map((service) => (
              <MenuItem key={service.id} value={service.id}>
                {service.name}
              </MenuItem>
            ))}
          </Select>


        </FormControl>
      </div>
    </Box>
  );
};

export default CustomStyledLayout;
