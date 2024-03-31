import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';

// Custom appointment tooltip content component
const CustomAppointmentTooltipContent = ( props ) => {
    const { appointmentData, onFieldChange, ...restProps } = props;
    const [name, setName] = useState("");
    const [services, setServices] = useState([]);
    const [clients, setClient] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedServices, setSelectedServices] = useState('');

    useEffect(() => {

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

        axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/client')
        .then(response => {
            setClient(response.data);
            
            for(let i = 0; i < response.data.length; ++i){

                if(response.data[i].id == appointmentData.client_id){
                  
                    setName(response.data[i].first_name + " " + response.data[i].last_name );
                    
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

    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const amOrPm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 || 12; 
    
        return `${formattedHours}:${minutes.toString().padStart(2, '0')}${amOrPm}`;
    };
    
    
    const startTime = formatTime(appointmentData.startDate);
    const endTime = formatTime(appointmentData.endDate);
    const timeRange = `${startTime} - ${endTime}`;

  return (
    <div style={{ padding: '30px' }}>
        {loading ? (
            <Typography variant="subtitle1">Loading...</Typography>
        ) : (
            <>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Client:</Typography>
                <Typography variant="body1" style={{ marginBottom: '8px' }}>{name}</Typography>

                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Service:</Typography>
                <Typography variant="body1" style={{ marginBottom: '8px' }}>{selectedServices}</Typography>

                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Time:</Typography>
                <Typography variant="body1">{timeRange}</Typography>
            
            </>
        )}
     </div>
  );
};

export default CustomAppointmentTooltipContent;
