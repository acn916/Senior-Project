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
  const [selectedStylist, setSelectedStylist] = useState(appointmentData.staff_id);
  const [selectedServices, setSelectedServices] = useState('');
 
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  

  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [clientEmail, setClientEmail] = useState("");


  useEffect(() =>{
    axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/service')
    .then(response => {
      setServices(response.data);
      setLoading(false);

     for(let i = 0; i < response.data.length; i++){

          if(response.data[i].id == appointmentData.service_id){
              setSelectedServices([response.data[i].name]);
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

        for(let i = 0; i < response.data.length; ++i){

          if(response.data[i].id == appointmentData.staff_id){
              setName(response.data[i].first_name + " " + response.data[i].last_name );
          }
          
        }
        setLoading(false);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
    });

    axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/client')
    .then(response => {
        setClient(response.data);
        //console.log('client name',response.data);
        for(let i = 0; i < response.data.length; ++i){

            if(response.data[i].id == appointmentData.client_id){
                setName(response.data[i].first_name + " " + response.data[i].last_name );
                setClientEmail(response.data[i].email);
            }
            
        }
        
        setLoading(false);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
    });

    setLoading(false);

  }, [appointmentData.client_id]);
 

 
  const handleServiceChange = (event) => {
    const selectedServiceName = event.target.value;
    const selectedService = services.find(service => service.name === selectedServiceName);
  
    if (selectedService) {
      setSelectedServices(selectedServiceName);
      onFieldChange({ service_id: selectedService.id });
    } else {
      console.log("Not Found");
    }
  };

  const handleStylistChange = (event) => {
    const selectedStylistId = event.target.value;
    const selectedStylist = stylist.find(stylist => stylist.id === selectedStylistId);
    
    if (selectedStylist) {
      setSelectedStylist(selectedStylistId);
      onFieldChange({ staff_id: selectedStylistId });
    } else {
      console.log("Stylist not found");
    }
  };

  const handleEmailChange = (event) => {
    setClientEmail(event.target.value); 
  };

  const handleNameChange = (event) => {
    setName(event.target.value); 
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
          value={name || ''}
          onChange={handleNameChange}
        />
      </div>
      <div style={{ marginBottom: '16px', marginTop: "16px" }}>
        <TextField
          id="client-id"
          label="Client Id"
          variant="outlined"
          fullWidth
          value={appointmentData.client_id || ''}
          onChange={(e) => onFieldChange({ client_id: e.target.value })}
        />
     </div>

      <div style={{ marginBottom: '16px', marginTop: "16px" }}>
        <TextField
          id="client-email"
          label="Email"
          variant="outlined"
          fullWidth
          value={clientEmail}
          onChange={handleEmailChange}
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

      <div style={{ marginBottom: '16px', marginTop: '16px' }}>
        <FormControl fullWidth>
          <InputLabel id="stylist-label">Stylist</InputLabel>
          <Select
            labelId="stylist-label"
            id="stylist"
            value={selectedStylist || ''}
            onChange={handleStylistChange}
            label="Stylist"
          >
            {stylist.map((stylistItem) => (
              <MenuItem key={stylistItem.id} value={stylistItem.id}>
                {`${stylistItem.first_name} ${stylistItem.last_name}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
              <MenuItem key={service.id} value={service.name}>
                {service.name}
              </MenuItem>
            ))}
            
          </Select>
        </FormControl>
      </div>
      
      <div>
        <TextField
            fullWidth
            id="notes"
            label="Notes"
            value={appointmentData.notes !== "null" ? appointmentData.notes : ''} 
            onChange={(e) => onFieldChange({ notes: e.target.value })}
            multiline
            rows={4}
            variant="outlined"
            style={{ marginTop: '16px' }}
        />
    </div>

    </Box>
  );
};

export default CustomStyledLayout;
