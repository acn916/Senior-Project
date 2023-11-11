import React from 'react';
import { Grid, Box, Container, Button, Typography } from '@mui/material';
import HomePicture from '../../pictures/home.jpg';
import MapPicture from '../../pictures/Maps.png';
import './Home.css'
import {Link} from "react-router-dom";

function Home() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} style={{position: 'relative'}}>
          
            
          <img
            src={HomePicture}
            alt="Red Salon Art"
            className='home-image'
          />

          {['Booking'].map((page) => (
            <Button
              key={page}
              style={{
                position: 'absolute',
                backgroundColor:'#E95252',
                color: '#FFFFFF',
                top: '20px',
                right: '10%'
              }}
            >
              <Link style={{textDecoration: "none", color: "white"}} to={`/${page}`}> Book Now</Link>
            </Button>
          ))} 

            
          


        </Grid>
        <Grid item xs={12}>

            <Box
              className='description-box'
            >
            <h3>Description</h3>
            <p>
              Red Salon Art is located in the heart of East Sacramento. Our professional staff are highly
              trained and offer a wide variety of hair services tailored to your needs. Our teams boundless
              creativity along with their vast knowledge of hair are eager to turn your hair goals into a reality.
              
            </p>
            </Box>

        </Grid>

        <Grid item xs={12} sm={6}>
          <Box>
            <img
              src={MapPicture}
              alt="Salon Location"
              className='left-column'
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            className='right-column'
          >
            <h3>Business Hours</h3>
            <Box className='business-hours'>
              <span>Sunday</span>
              <span className='time'>Closed</span>
            </Box>
            <Box className='business-hours'>
              <span>Monday</span>
              <span className='time'>Closed</span>
            </Box>
            <Box className='business-hours'>
              <span>Tuesday</span>
              <span className='time'>9:00AM - 8:00PM</span>
            </Box>
            <Box className='business-hours'>
              <span>Wednesday</span>
              <span className='time'>9:00AM - 8:00PM</span>
            </Box>
            <Box className='business-hours'>
              <span>Thursday</span>
              <span className='time'>9:00AM - 8:00PM</span>
            </Box>
            <Box className='business-hours'>
              <span>Friday</span>
              <span className='time'>9:00AM - 8:00PM</span>
            </Box>
            <Box className='business-hours'>
              <span>Saturday</span>
              <span className='time'>9:00AM - 6:00PM</span>
            </Box>
          </Box>
        </Grid>

        
        <Grid item xs={12} sm={6}>
          <Box className='left-column'>
            <h3>Payment Methods Accepted</h3>
            <p>Visa and MasterCard, Discover, Debit Card, Cash</p>
          </Box>
          <Box className='left-column'>
            <h3>Parking Instructions</h3>
            <p>Parking passes are provided for clients upon request in addition, we do have parking located in the driveway behind our salon</p>
            <p>Note: Free 1-2 hour parking on J Street or most numbered streets. Note that any parking spots past our salon on 38th Street is C Permit ONLY.</p>
          </Box>
          <Box className='left-column'>
             <h3>Request Consultation</h3>
             <p>First time clients and hair extensions require consultation please give us a call.</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className='right-column'>
            <h3>Amenities</h3>
            <p>Disabled Access, WiFi</p>
          </Box>
          <Box className='right-column'>
            <h3>Kid Friendly</h3>
            <p>We ask that your child is not disruptive to other customers</p>
          </Box>
          <Box className='right-column'>
             <h3>Appointment Calcellation Policy</h3>
            <p>We are sorry to not see you for your appointment. Please cancel your appointment as soon as possible.</p>        
          </Box>
          <Box className='right-column'>
            <h3>Website</h3>
            <li>www.redsalonart.com</li>
          </Box> 
        </Grid>
      </Grid>
    </Container>
    
  )
}

export default Home;
