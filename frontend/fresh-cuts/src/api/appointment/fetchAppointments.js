import axios from 'axios'

export async function fetchAppointments() {
    try{
        const response = await axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointments');
        console.log("Successfully retrieved appointments");
        return response.data
        
    }catch (error){
        console.error("Error retrieving appointments", error);
    }
}
