import axios from 'axios'

export async function getEmailById(id) {
    try{
        const response = await axios.get(`https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_id_from_email/${id}`);
        console.log("Successfully retrieved id from email");
        return response.data

    }catch (error){
        console.error("Error retrieving id from email", error);
    }
}