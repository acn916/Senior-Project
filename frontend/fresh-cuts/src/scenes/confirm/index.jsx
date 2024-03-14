import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Confirmation = () => {

    return (
        <Container>
        <div style={{ border: '1px solid black', padding: '20px', marginTop: "200px" }}>
          <Typography variant="h4" component="h2" textAlign="center" >
            THANK YOU!
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            marginTop="10px"
            style={{ maxWidth: "500px", margin: "0 auto" }}
          >
            We appreciate your interest in our hairstyling services. Your request has been received, and we'll get back to you as soon as possible. Please allow up to 24 hours for request to be reviewed. 
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            marginTop="50px"
            style={{ maxWidth: "500px", margin: "0 auto" }}
          >
           Please feel free to reach out directly at (916)451-1517 or email us at redalonart@gmail.com
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <Link to="/Home">
            <Button
                variant="contained"
                style={{
                backgroundColor: "#E95252",
                color: "white",
                transition: "background-color 0.3s",
                }}
            >
                Return to Home
            </Button>
          </Link>
          </div>
        </div>
      </Container>
      

    );
  
};

export default Confirmation;
