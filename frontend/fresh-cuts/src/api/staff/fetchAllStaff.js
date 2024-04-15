import axios from 'axios'

export async function fetchAllStaff() {
    try{
        const response = await axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/staff');
        console.log("Successfully retrieved all staff");
        return response.data

    }catch (error){
        console.error("Error retrieving staff list", error);
    }
}