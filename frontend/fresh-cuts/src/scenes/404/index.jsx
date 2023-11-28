import React from 'react';
import { Container, Typography, Button, Box} from '@mui/material';
import Error from '../../pictures/404.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import './ErrorPage.css';


function ErrorPage() {
  return (
    <Container sx={{ marginTop: '30px', textAlign: 'center' }}>
      <img
        src={Error}
        alt='ErrorPage'
        style={{ width: '80%' }}
        className='img'
      />
      <Typography variant="h3">
        Oops. This Page Cannot Be Found.
      </Typography>
      <Box marginTop={"20px"}>

      </Box>
      <Typography>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Box style={{ marginTop: '15px' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<ArrowBackIcon />}
          sx={{
            backgroundColor: "#E95252",
            borderRadius: '50px',
            marginTop: '20px',
            '&:hover': {
              backgroundColor: "#E95252", // Set hover color to the same as background color
            },
          }}
        >
            <Link style={{textDecoration: "none", color: "white"}} to="/"> Back to home</Link>

        </Button>
      </Box>
    </Container>
  );
}

export default ErrorPage;
