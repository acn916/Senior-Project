import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Card, CardContent, Button, Box } from "@mui/material";
import axios from "axios";
import {Link} from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/service')
      .then(response => {
        console.log(response);
        setServices(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Container style={{marginTop: '20px', marginBottom: '20px'}}>
          <Box mt={3}>
            <Typography variant="h4" component="h2" gutterBottom>
              Our Services
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {services.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <Card style={{ height: "100%", backgroundColor: "#f2f2f2", display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {service.name}
                    </Typography>
                    {service.description && (
                      <Typography variant="body2" color="textSecondary">
                        {service.description}
                      </Typography>
                    )}
                    {service.price > 0 &&  (
                      
                      <Typography variant="body2" color="textSecondary">
                        Price: Starting at ${service.price}
                      </Typography>
                    )}
                  </CardContent>
                  <div style={{ marginTop: 'auto', textAlign: 'right', padding: '15px' }}>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#E95252",
                        color: "white",
                        transition: "background-color 0.3s",
                      }}
                    >
                      <Link style={{textDecoration: "none", color: "white"}} to="/booking">Request</Link>
                    </Button>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default Services;
