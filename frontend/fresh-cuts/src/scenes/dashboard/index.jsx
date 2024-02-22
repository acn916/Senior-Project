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
import { AppsSharp } from '@mui/icons-material';

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
                  title: `${appointment.client_id}`,
                  service_id: `${appointment.service_id}`,
                  staff_id: `${appointment.staff_id}`,
                  client_id:`${appointment.client_id}`,
                  notes: `${appointment.notes}`,
                  status: `${appointment.status}`,
              };
          });
              
              console.log(response);
              setAppointments(formattedAppointments);
              
          })
          .catch(error => {
              console.error('Error fetching data:', error);
              setLoading(false);
          });

        axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff')
          .then(response => {
              setStylist(response.data);
              
          })
          .catch(error => {
              console.error('Error fetching data:', error);
              setLoading(false);
          });

       

        setLoading(false);

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
      let updatedData = [...appointments]; // Copy the current state of appointments
      
      if (added) {
        console.log("Added!");

        console.log(added.startDate)
    
        const newAppointment = [
          {
            client_id: added.client_id,
            staff_id: added.staff_id,
            service_id: added.service_id,
            scheduled_at: added.startDate.toISOString().split('T')[0] + ' ' + added.startDate.toTimeString().split(' ')[0], // Adjust date format
            status: "Pending",
            notes: added.notes,
            confirmation_timestamp: added.confirmation_timestamp,
          }
        ];
        
    
       // console.log(newAppointment);
        axios.post('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointment', newAppointment)
          .then(response => {
            console.log("Appointment added successfully:", response.data);
            // Update the appointment with the ID received from the server
            const updatedAppointment = { ...added, id: response.data.id };
            updatedData = [...updatedData, updatedAppointment]; // Add the updated appointment to the copy of appointments
            setAppointments(updatedData); // Update the state with the new data
          })
          .catch(error => {
            console.error('Error adding appointment:', error);
            // No need to rollback changes here, as we haven't updated the state yet
          });

        
        
      }
    
      
      if (changed) {
        console.log("Changed!");
    
        Object.keys(changed).forEach(appointmentId => {

          //console.log(parseInt(appointmentId));
          let id = parseInt(appointmentId);

         // console.log(updatedData);
          //console.log(changed[id]);
          let prevData = {};

          for(let i = 0; i < updatedData.length; ++i){
            if(updatedData[i].id === id){
              prevData = updatedData[i];
            }
          }
          let changedData = changed[id];
          
          // Extracting and formatting start date
          let newStartDate;
          if (changedData.startDate instanceof Date) {
              newStartDate = changedData.startDate.toISOString().split('T')[0] + ' ' + changedData.startDate.toTimeString().split(' ')[0];
          } else {
              newStartDate = prevData.startDate.toISOString().split('T')[0] + ' ' + prevData.startDate.toTimeString().split(' ')[0];
          }

          console.log(newStartDate);
          
          const newData = {
            
            client_id: changedData.client_id !== undefined ? changedData.client_id : prevData.client_id,
            staff_id: changedData.staff_id !== undefined ? changedData.staff_id : prevData.staff_id,
            service_id: changedData.service_id !== undefined ? changedData.service_id : prevData.service_id,
            scheduled_at: newStartDate,
            status: prevData.status,
            notes: "none",
            confirmation_timestamp: newStartDate,
            cancellation_reason: "none"
          }
        
          //console.log(newData)
          
          axios.put(`https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointment/${id}`, [newData])
            .then(response =>{
              console.log(response);
            })
            .catch(error =>{
              console.error("Error updating", error);
            })   
        });
      }

    
  
      if (deleted) {
        console.log("Deleted!");
      
        let id = deleted;
        console.log(deleted);
        axios.delete(`https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointment/${id}`)
          .then(response => {
            // Handle success response if needed
            console.log(response);
          })
          .catch(error =>{
            console.error('Error deleting appointment', error);
          })
      
        updatedData = updatedData.filter(appointment => appointment.id !== deleted);
      }
      
    
      setAppointments(updatedData); // Update the state with the new data (for changes other than additions)
    };
    



      return (
        <div>
          {loading ? (
            <div>Loading</div>
          ) : (
            <Paper style={{ marginTop: '20px' }}>
              <Scheduler data={appointments} height={600}>
                <ViewState
                  defaultCurrentDate={currentDate}
                  defaultCurrentViewName="Week"
                />
                <EditingState onCommitChanges={commitChanges} />
                <IntegratedEditing />
                <ConfirmationDialog ignoreCancel />
                <DayView startDayHour={9} endDayHour={18} />
                <WeekView startDayHour={9} endDayHour={24} />
                <MonthView startDayHour={12} endDayHour={20} />
                <Toolbar flexibleSpaceComponent={CustomToolbar} />
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
          )}
        </div>
      );
      
}

export default Dashboard;