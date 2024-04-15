import axios from 'axios'

export async function fetchAllClients() {
    try{
        const response = await axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/client');
        console.log("Successfully retrieved all clients");
        return response.data

    }catch (error){
        console.error("Error retrieving clients", error);
    }
}