import React from "react";
import { Container, Typography, Button, Grid, Box, Divider, Paper } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import IconButton from "@mui/material/IconButton";
//import { Link } from "react-router-dom";

const staffMembers = [
  {name: "Kayla Nguyen",
  phoneNumber: "(555) 555-5555",
  instagram: "@kayla.hairextensionartist",
  
  },
  {
    name: "Olen Michael",
    phoneNumber: "(123) 456-7890",
    instagram: "@olenmichael",

  },
  {
    name: "Stacie Cameron",
    phoneNumber: "(123) 456-7890",
    instagram: "@hair.space.by.stac",
    
  },
  {
    name: "Sil",
    phoneNumber: "(123) 456-7890",
    instagram: "@hairbysil_b",
    
  },
  {
    name: "Stafanie Pupo",
    phoneNumber: "(123) 456-7890",
    instagram: "@_styledbystef",
  },
  {
    name: "Victoria Saeteurn",
    phoneNumber: "(123) 456-7890",
    instagram: "@hairbyvictoriasae",
  },
  {
    name: "Starrie Le",
    phoneNumber: "(123) 456-7890",
    instagram: "@hairbystarrie",
  },
  // Add more staff members as needed
];

const Staff = () => {
  return (
    <Container>
     

      <Typography mt={3} variant="h4" component="h2" gutterBottom textAlign="center">
        Our Stylists
      </Typography>
      <Divider variant="middle" sx={{ mt: 3, mb: 3 }} />
      <Grid container spacing={3}>
        {staffMembers.map((staff, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper style={{ background: "#f5f5f5", padding: "1rem" }}> {}
              <Typography aria-label={staff.name} variant="h6" component="div" textAlign="center" color={"#000000"}>
                {staff.name}
              </Typography>
              <Typography textAlign="center" variant="body2" color="textSecondary">
                
                <IconButton
                  component="a"
                  aria-label={`INSTA${index}`}
                  //href={`https://www.instagram.com/${staff.instagram.slice(1)}`}
                  href={`https://www.instagram.com/${staff.instagram.slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#E95252" }}
                >
                  <InstagramIcon />
                </IconButton>
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Button
                variant="contained"
                aria-label={`BOOK${index}`}
                href={`http://localhost:3000/booking`}
                style={{
                    backgroundColor: "#E95252",
                    color: "white",
                    transition: "background-color 0.3s",
                }}
                >
                {/*<Link style={{textDecoration: "none", color: "white"}} to="/booking">Book</Link>*/}
                Book
                </Button>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Divider variant="middle" sx={{ mt: 3, mb: 3 }} />
    </Container>
  );
};

export default Staff;