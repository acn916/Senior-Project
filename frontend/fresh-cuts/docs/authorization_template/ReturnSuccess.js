// Template of how to call a lambda function with authentication
// Some lambda functions will not need authentication, but it will still work
// Even if you pass in the header
// Frontend will need to have access to the lambda functions to invoke

import React, { useState, useContext } from "react";
import axios from "axios";
import { AccountContext } from "./Account";

export default () => {
  // Your variable you want to store the http request in
  const [msg, setMsg] = useState("");
  // Get the current session for the signed in user
  const { getSession } = useContext(AccountContext);

  // Function that is invoked on click of a button
  const testMsg = () => {
    // Get the current session and this will retrieve the authentication token needed
    // To call the lambda function. It might not be set up for all lambda functions, but to
    // Check whether authentication is actually needed, paste the URL into your browser
    // It will return an unauthorized message if authentication is required
    getSession().then(async ({ headers }) => {
      const url =
        "https://7zeou1i376.execute-api.us-west-1.amazonaws.com/Return_Success";
      // Prints the authentication token, if you need to manipulate the tokens from the current session
      console.log(headers);

      try {
        // Get a response from the lambda function, in this case it will always return 200 OK
        const response = await axios.get(url, { headers });

        // Check if the response status code is 200
        if (response.status === 200) {
          setMsg(response.data);
        } else if (response.status === 404) {
          // Handle 404 status code
          setMsg(`Error: ${response.data.message}`);
        } else {
          // Handle other status codes
          setMsg(`Error: Unexpected status code - ${response.status}`);
        }
        // If all goes well read whatever the lambda function returned, in this case
        // "Hello from lambda" 200 OK
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });
  };

  return (
    <div>
      <div>Return Success: {msg}</div>
      <button onClick={testMsg}>Click here to get msg from lambda</button>
    </div>
  );
};
