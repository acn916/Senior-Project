import React, {useState, useEffect} from 'react'
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
import { FormControl, Select, MenuItem, useMediaQuery, useTheme, Button} from '@mui/material';
import CustomBasicLayout from './CustomAppointmentForm';
import { ConfirmationDialog } from '@devexpress/dx-react-scheduler-material-ui';
import { AppsSharp } from '@mui/icons-material';
import CustomAppointmentTooltipContent from './CustomToolTip';
import './styles.css'; 
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import PopupForm from './AddAppointments';


// Component start
function Dashboard() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // create state variables to hold data from api call
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentStylist, setCurrentStylist] = useState('All');
    const [stylist, setStylist] = useState([]);
    const [clients, setClients] = useState([]);
    const [name, setName] = useState("");
    const [openForm, setOpenForm] = useState(false);

  
    const fetchAppointments = async () =>  {

      try{
        const response = await axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/dashboard');
        const clientsResponse = await axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/client');
        const clientsData = clientsResponse.data; 

        const serviceResponse =  await axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/service');
        const serviceData = serviceResponse.data;
       

        const formattedAppointments = response.data.map(appointment => {

            const client = clientsData && clientsData.length > 0 ? clientsData.find(client => client.id === appointment.client_id) : null;
            const clientName = client ? `${client.first_name} ${client.last_name}` : ''; 
            const service = serviceData && serviceData.length > 0 ? serviceData.find(service => service.id === appointment.service_id) : null; 
            const serviceName = service ? service.name : '';

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
                  email: `${appointment.email}`,
                  phone: `${appointment.phone}`,
                  client_name: `${appointment.first_name + appointment.last_name}`,
                  service_name: serviceName, 
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

    const fetchClients = async () => {
      try {
          const clientResponse = await axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/client');
          setClients(clientResponse);
          
      } catch (error) {
          console.error("Error fetching clients:", error);
      }
  };

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
      //const intervalId = setInterval(fetchAppointments, 9000);

      //return () => clearInterval(intervalId);  


    },[currentStylist]);

    const CustomToolbar = () => {


      const handleStylistChange = (event) => {
        const selectedStylistId = event.target.value;
        setCurrentStylist(selectedStylistId); // Update currentStylist state
        fetchAppointments(); // Fetch appointments based on selected stylist
      };

      const handleOpenForm = () => {
        setOpenForm(true);
      };
    
      const handleCloseForm = () => {
        setOpenForm(false);
      };
    
    const handleSubmitForm = async (formData) => {
      //console.log('start date', formData.startDate);
      
      try {
        // Check if the client already exists in the database
        let clientId;
        if (await has_email(formData.email) === 1) {
          clientId = await get_id_from_email(formData.email);
        } else {
          // If the client doesn't exist, add them to the database
          const nameParts = formData.name.split(" ");
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(" ");
          const userInfo = {
            first_name: firstName,
            last_name: lastName,
            email: formData.email,
            phone: formData.phone
          };
          clientId = await handleAddClient(userInfo);
        }
        
        const [startDate, startTime] = formData.startDate.split('T');
        // Create a new appointment object
        const newAppointment = {
          service_id: formData.service_id,
          client_id: clientId,
          staff_id: formData.stylist,
          notes: formData.notes ? formData.notes : null,
          scheduled_at: startDate + ' ' + startTime.split(':')[0] + ':' + startTime.split(':')[1] + ':00',
          status: "Confirmed",
          confirmation_timestamp: startDate + ' ' + startTime.split(':')[0] + ':' + startTime.split(':')[1] + ":00", 
        };
    
        console.log(newAppointment)
        axios.post('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointment', [newAppointment])
        .then(response => {
            console.log(response);
          

        })
        .catch(error => {
            console.error('Error adding appointment:', error);
        });

    
    
        // Close the form
        handleCloseForm();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

      return (
        <Toolbar.FlexibleSpace style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <IconButton
              color="primary"
              aria-label="add appointment"
              style={{ color: '#F43F5E' }}
              onClick={handleOpenForm} 
            >
              <AddIcon />
            </IconButton>
            <PopupForm
              open={openForm}
              handleClose={handleCloseForm}
              handleSubmit={handleSubmitForm}
              data={null} 
            />
          </div>
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

    const has_email = async (email) => {
      try{

          const response = await axios.get(`https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/has_email?email=${email}`);
          return response.data.has_email;
      } catch (error){
          console.error("Error calling has_email", error);
      }     
      
    }
    const get_id_from_email = async (email) => {
      try{
          const response = await axios.get(`https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_id_from_email?email=${email}`)
          return (response.data.id)

      }catch (error){
          console.error("Error retrieving client id", error);
      }
  }
  const handleAddClient = async (client) =>{
    try{
        const response = await axios.post('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/client', client)
        console.log(response.data)
        return response.data.id
    }catch (error){
        console.error("Error adding client", error);
    }
}
    
    const commitChanges = ({ added, changed, deleted }) => {
        let updatedData = [...appointments]; // Copy the current state of appointments
      if (added) {
        console.log("added", added)

        const handleAddAppointment = async () => {

          if(await has_email(added.email) === 1){
            console.log("found");
            const id = await get_id_from_email(added.email);


            const newAppointment = [{
              service_id: added.service_id,
              client_id: id,
              staff_id: added.staff_id,
              notes: added.notes ? added.notes : null,
              scheduled_at: added.startDate.toISOString().split('T')[0] + ' ' + added.startDate.toTimeString().split(' ')[0], // Adjust date format, 
              status: "Confirmed",
              confirmation_timestamp: added.startDate.toISOString().split('T')[0] + ' ' + added.startDate.toTimeString().split(' ')[0], // Adjust date format
              
            }];

            console.log(newAppointment)
            axios.post('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointment', newAppointment)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Error adding appointment:', error);
            });

          }
          else{

            console.log("Not Found");
            const nameParts = added.name.split(" ");
            const firstName = nameParts[0]; // Extract the first part as the first name
            const lastName = nameParts.slice(1).join(" "); // Extract the remaining parts as the last name
            const userInfo = {
              first_name: firstName,
              last_name: lastName,
              email: added.email,
              phone: added.phone
            }

            const id = await handleAddClient(userInfo)
            const newAppointment = [{
              service_id: added.service_id,
              client_id: id,
              staff_id: added.staff_id,
              notes: added.notes ? added.notes : null,
              scheduled_at: added.startDate.toISOString().split('T')[0] + ' ' + added.startDate.toTimeString().split(' ')[0], // Adjust date format, 
              status: "Confirmed",
              confirmation_timestamp: added.startDate.toISOString().split('T')[0] + ' ' + added.startDate.toTimeString().split(' ')[0], // Adjust date format
              
            }];
            console.log(newAppointment);
            axios.post('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointment', newAppointment)
            .then(response => {
                console.log(response);
                
            })
            .catch(error => {
                console.error('Error adding appointment:', error);
            });



          }

        }

        handleAddAppointment();
        
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
            notes: changedData.notes !== undefined ? changedData.notes : prevData.notes,
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
    
    const appointmentCellColor = ({children, style,  data, ...restProps }) => {
      //console.log("Client Name:", client_name); // Add console log for debugging
      //console.log("Props in appointmentCellColor:", data); // Add console log to check received props
    
      const {client_name, service_name, } = data; 
      

      //console.log("Client Name:",client_name);
    
      return (
        <Appointments.Appointment
        {...restProps}
        data={data}
        style={{
          ...style,
          backgroundColor: '#F43F5E',
          borderRadius: '8px',
        }}
      >
        <div style={{textAlign: 'center'}}>
          <h3 style={{ color: 'white',fontSize: '12px' }}>{client_name} - {service_name} {children}</h3>
         
        </div>
      </Appointments.Appointment>
      );
    };
    
   

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
                  height={isMobile ? 'auto' : '100%'}
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
                    
                    contentComponent={CustomAppointmentTooltipContent}
                    showCloseButton
                    showOpenButton
                    showDeleteButton
                  />

                  <AppointmentForm basicLayoutComponent={CustomBasicLayout}/>


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
