import axios from "axios";

export const fetchServices = async () => {
  try {
    const response = await axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/service');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};
