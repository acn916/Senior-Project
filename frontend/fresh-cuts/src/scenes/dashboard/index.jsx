import {useState, useEffect} from 'react'

import {
    EditingState,
    IntegratedEditing,
    ViewState,
} from '@devexpress/dx-react-scheduler';

import {
    Scheduler,
    DayView,
    WeekView,
    Appointments,
    DateNavigator,
    AppointmentTooltip,
    AppointmentForm,
    Toolbar,
    ViewSwitcher,
    MonthView,
} from '@devexpress/dx-react-scheduler-material-ui';

import { Paper } from '@mui/material';

import axios from "axios";

function Dashboard() {

    const [currentDate, setCurrentDate] = useState('2023-12-01');


    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointments')
        .then(response => {
            const formattedAppointments = response.data.map(appointment => {
            const [year, month, day, hour, minute] = appointment.scheduled_at
                .match(/\d+/g)
                .map(Number);
    
            return {
                id: appointment.id,
                startDate: new Date(year, month - 1, day, hour, minute),
                endDate: new Date(year, month - 1, day, hour + 1, minute),
                title: `Client ID: ${appointment.client_id}`,
            };
            });
            
            console.log(response);
            setAppointments(formattedAppointments);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });

    },[]);






    return (


        <Paper style={{marginTop:'20px'}}>
            <Scheduler
                data={appointments}
                height={600}
            >
                <ViewState 
                    defaultCurrentDate={currentDate}
                    defaultCurrentViewName='Week'
                />

                <DayView startDayHour={9} endDayHour={18} />
                <WeekView startDayHour={9} endDayHour={24} />
                <MonthView startDayHour={12} endDayHour={20} />         

            </Scheduler>


        </Paper>

    )
}

export default Dashboard;