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


// Component start
function Dashboard() {

  // create state variables to hold data from api call
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentStylist, setCurrentStylist] = useState('All');
    const [stylist, setStylist] = useState([]);
   


    const fetchAppointments = async () =>  {

      try{
        const response = await axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointments');

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
    
        let confirmedAppointments = [];
        for(let i = 0; i < formattedAppointments.length; ++i){

          if(formattedAppointments[i].status === 'Confirmed'){
            confirmedAppointments.push(formattedAppointments[i])
          }
        }

        if(currentStylist === 'All'){
          setAppointments(confirmedAppointments)
        }
        else{

          let stylistAppointments = [];
          for(let i = 0; i < confirmedAppointments.length; ++i){

            if(parseInt(confirmedAppointments[i].staff_id) === currentStylist){
              stylistAppointments.push(confirmedAppointments[i]);
            }
          }
          setAppointments(stylistAppointments);
        }
      } catch(error){
        console.error("Error fetching data:'", error);
        setLoading(false);
      }
    }

    useEffect(() => {

      axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff')
        .then(response => {
            setStylist(response.data);
            
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });


      fetchAppointments();

      setLoading(false);
      const intervalId = setInterval(fetchAppointments, 9000);

      return () => clearInterval(intervalId);  


    },[currentStylist]);

    const CustomToolbar = () => {


      const handleStylistChange = (event) => {
        const selectedStylistId = event.target.value;
        setCurrentStylist(selectedStylistId); // Update currentStylist state
        fetchAppointments(); // Fetch appointments based on selected stylist
      };
    
      return (
        <Toolbar.FlexibleSpace style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl style={{ marginRight: '20px', width: '150px' }}>
            <Select
              labelId="stylist-select-label"
              id="stylist-select"
              value={currentStylist || 'All'}  
              onChange={handleStylistChange}
              sx={{ height: '44px' }}
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
    };
    

   
    
    const commitChanges = ({ added, changed, deleted }) => {
        let updatedData = [...appointments]; // Copy the current state of appointments
      
      if (added) {

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
            
        axios.post('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointment', newAppointment)
          .then(response => {
            const updatedAppointment = { ...added, id: response.data.id };
            updatedData = [...updatedData, updatedAppointment]; 
            setAppointments(updatedData); 
          })
          .catch(error => {
            console.error('Error adding appointment:', error);
          });
      }
    
      
      if (changed) {    
        Object.keys(changed).forEach(appointmentId => {

          let id = parseInt(appointmentId);
          let prevData = {};

          for(let i = 0; i < updatedData.length; ++i){
            if(updatedData[i].id === id){
              prevData = updatedData[i];
            }
          }

          let changedData = changed[id];
          let newStartDate;
          
          if (changedData.startDate instanceof Date) {
              newStartDate = changedData.startDate.toISOString().split('T')[0] + ' ' + changedData.startDate.toTimeString().split(' ')[0];
          } else {
              newStartDate = prevData.startDate.toISOString().split('T')[0] + ' ' + prevData.startDate.toTimeString().split(' ')[0];
          }
          
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
                  
          axios.put(`https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointment/${id}`, [newData])
            .then(response =>{
              fetchAppointments();
            })
            .catch(error =>{
              console.error("Error updating", error);
            })   
        });


      }

      if (deleted) {
      
        let id = deleted;
        axios.delete(`https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointment/${id}`)
          .then(response => {
            console.log("Deleted Successfully");
          })
          .catch(error =>{
            console.error('Error deleting appointment', error);
          })
      
        updatedData = updatedData.filter(appointment => appointment.id !== deleted);
      }
      
      setAppointments(updatedData);
    };

    const appointmentCellColor = ({children, style, ...restProps }) => (
      <Appointments.Appointment
        {...restProps}
        style={{
          ...style,
          backgroundColor: '#F43F5E',
          borderRadius: '8px',
        }}
      >
        {children}
      </Appointments.Appointment>
    );

    const CustomTimeTableCellWeek = ({ startDate, ...restProps }) => {
      const currentTime = new Date();
      const isPastTime = startDate < currentTime;
      const cellStyles = isPastTime ? { backgroundColor: '#F0F0F0' } : {};
      return <WeekView.TimeTableCell startDate={startDate} style={cellStyles} {...restProps} />;
    };

    const CustomTimeTableCellDay = ({ startDate, ...restProps }) => {
      const currentTime = new Date();
      const isPastTime = startDate < currentTime;
      const cellStyles = isPastTime ? { backgroundColor: '#F0F0F0' } : {};
      return <DayView.TimeTableCell startDate={startDate} style={cellStyles} {...restProps} />;
    };

    const CustomTimeTableCellMonth = ({ startDate, ...restProps }) => {
      const currentTime = new Date();
      const isPastTime = startDate < currentTime;
      const cellStyles = isPastTime ? { backgroundColor: '#F0F0F0' } : {};
      return <MonthView.TimeTableCell startDate={startDate} style={cellStyles} {...restProps} />;
    };

      return (
        <div>
          {loading ? (
            <div>Loading</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Paper style={{ flex: '1 0 auto', overflow: 'auto' }}>
                <Scheduler
                  data={appointments}
                  height={'100%'}
                >
                  <ViewState
                    defaultCurrentDate={currentDate}
                    defaultCurrentViewName='Week'
                  />
                  <EditingState onCommitChanges={commitChanges} />
                  <IntegratedEditing />
                  <ConfirmationDialog ignoreCancel />
                  <DayView 
                    startDayHour={9} endDayHour={18} 
                    timeTableCellComponent={CustomTimeTableCellDay}
                  />
                  <WeekView
                    startDayHour={9} endDayHour={20}
                    timeTableCellComponent={CustomTimeTableCellWeek}
                  />
                  <MonthView 
                    startDayHour={12} endDayHour={20} 
                    timeTableCellComponent={CustomTimeTableCellMonth}
                  />
                  <Toolbar flexibleSpaceComponent={CustomToolbar} />
                  <ViewSwitcher />
                  <Appointments
                    appointmentComponent={appointmentCellColor}
                  />
                  <AppointmentTooltip
                    showCloseButton
                    showOpenButton
                    showDeleteButton
                  />
                  <AppointmentForm basicLayoutComponent={CustomBasicLayout} />
                  <DateNavigator />
                </Scheduler>
              </Paper>
              <footer style={{ flexShrink: 0, height: '100px', overflow: 'hidden' }}></footer>
            </div>
         )}
        </div>
      );
      
}

export default Dashboard;