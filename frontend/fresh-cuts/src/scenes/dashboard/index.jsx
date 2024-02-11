import {useState, useEffect} from 'react'
import axios from "axios";

import { Paper } from '@mui/material';
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

import { FormControl, Select, MenuItem } from '@mui/material';
import CustomBasicLayout from './CustomAppointmentForm';
import { ConfirmationDialog } from '@devexpress/dx-react-scheduler-material-ui';

function Dashboard() {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentDate, setCurrentDate] = useState(new Date());

    const [currentStylist, setCurrentStylist] = useState(null);
    const [stylist, setStylist] = useState([]);


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

        axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff')
        .then(response => {
            setStylist(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });

        console.log(appointments);
        console.log(stylist);

    },[]);

    const CustomToolbar = () => (
        <Toolbar.FlexibleSpace style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl style={{ marginRight: '20px', width: '150px' }}>
            <Select
              labelId="stylist-select-label"
              id="stylist-select"
              value={currentStylist || 'All'}  // Set initial value to 'All'
              onChange={handleStylistChange}
            >
              <MenuItem value="All">
                <em>All</em>
              </MenuItem>
              {stylist.map((stylistItem) => (
                <MenuItem key={stylistItem.id} value={stylistItem.id}>
                  {stylistItem.first_name + " "  + stylistItem.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar.FlexibleSpace>
    );

    const handleStylistChange = (event) => {
        const selectedStylistId = event.target.value;
        // You can perform any additional actions when a stylist is selected
        setCurrentStylist(selectedStylistId);
    };
    const commitChanges = ({ added, changed, deleted }) => {
        setAppointments((prevData) => {
          let updatedData = [...prevData];
    
          if (added) {
            console.log("Added!");
            const startingAddedId = prevData.length > 0 ? prevData[prevData.length - 1].id + 1 : 0;
            updatedData = [...prevData, { id: startingAddedId, ...added }];
          }
    
          if (changed) {
            console.log("Changed!");
            updatedData = updatedData.map((appointment) =>
              changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
            );
          }
    
          if (deleted !== undefined) {
            console.log("Deleted!");
            updatedData = updatedData.filter((appointment) => appointment.id !== deleted);
          }
    
          return updatedData;
        });
      };



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
                <EditingState onCommitChanges={commitChanges} />
                <IntegratedEditing />
                <ConfirmationDialog ignoreCancel />
                <DayView startDayHour={9} endDayHour={18} />
                <WeekView startDayHour={9} endDayHour={24} />
                <MonthView startDayHour={12} endDayHour={20} />   
                <Toolbar flexibleSpaceComponent={CustomToolbar}/>
                <ViewSwitcher />
                <Appointments />
                <AppointmentTooltip 
                    showCloseButton 
                    showOpenButton 
                    showDeleteButton 
                />
                <AppointmentForm basicLayoutComponent={CustomBasicLayout} />
                <DateNavigator />
            </Scheduler>
        </Paper>
    )
}

export default Dashboard;