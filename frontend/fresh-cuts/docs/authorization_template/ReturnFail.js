// Template of how to call a lambda function with authentication
// Some lambda functions will not need authentication, but it will still work
// Even if you pass in the header
// Header will be provided if the useContext(AccountContext) is used, but if user is not signed in it will cause an error
// Exclude if you don't require any user authentication
// Frontend will need to have access to the lambda functions to invoke

import React, { useState, useContext } from "react";
import axios from "axios";
import { AccountContext } from "./Account";

export default () => {
  // Your variable you want to store the http request in
  const [msg, setMsg] = useState("");
  // Get the current session for the signed in user
  // If you just need to call the lambda function to say get some services that doesn't need
  // authentication, you can just exclude the getSession, as it is there to grab the authentication tokens
  // from the headers
  // For development purposes we can just do authentication later, or just test if it works after you completed your portion for convenience, as you
  // would have to be signed in if you need headers
  const { getSession } = useContext(AccountContext);

  const testMsg = () => {
    // Get session gets the current users logged in credentials, if the user isn't logged in
    // Then it won't return the correct credentials
    // In hindsight it shouldn't render the HTML if the user is not logged in
    getSession().then(async ({ headers }) => {
      const url =
        "https://7zeou1i376.execute-api.us-west-1.amazonaws.com/Return_Fail";
      console.log(headers);

      try {
        // Since the response is a 404, I believe
        // Axios returns an error message by default.
        const response = await axios.get(url, { headers });

        // Check if the response status code is 200
        // In this js file, it will return 404, as the Return_Fail lambda function returns a 404 message back.
        if (response.status === 200) {
          setMsg(response.data);
        }
      } catch (error) {
        // Handle errors here
        //console.error("Error fetching data:", error);

        // Check if the error is due to a specific status code
        if (error.response && error.response.status === 404) {
          setMsg(error.response.data);
          console.log(error.response.data);
        } else {
          // Handle other errors
          setMsg(`Error: Something went wrong`);
        }
      }
    });
  };
  return (
    <div>
      <div>Return Fail: {msg}</div>
      <button onClick={testMsg}>Click here to get msg from lambda</button>
    </div>
  );
};
