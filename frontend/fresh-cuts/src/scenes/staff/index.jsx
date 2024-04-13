import React from "react";
import { Container, Typography, Button, Grid, Box, Divider, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

// const staffMembers = [
//   {name: "Kayla Nguyen",
//   phoneNumber: "(555) 555-5555",
//   instagram: "@kayla.hairextensionartist",
  
//   },
//   {
//     name: "Olen Michael",
//     phoneNumber: "(123) 456-7890",
//     instagram: "@olenmichael",

//   },
//   {
//     name: "Stacie Cameron",
//     phoneNumber: "(123) 456-7890",
//     instagram: "@hair.space.by.stac",
    
//   },
//   {
//     name: "Sil",
//     phoneNumber: "(123) 456-7890",
//     instagram: "@hairbysil_b",
    
//   },
//   {
//     name: "Stafanie Pupo",
//     phoneNumber: "(123) 456-7890",
//     instagram: "@_styledbystef",
//   },
//   {
//     name: "Victoria Saeteurn",
//     phoneNumber: "(123) 456-7890",
//     instagram: "@hairbyvictoriasae",
//   },
//   {
//     name: "Starrie Le",
//     phoneNumber: "(123) 456-7890",
//     instagram: "@hairbystarrie",
//   },
//   // Add more staff members as needed
// ];

const Staff = () => {
  

  const [staffMembers, setStaffMembers] = useState([]);

  useEffect(() => {
    getAllStaff();
  }, []);

  const getAllStaff = () => {
    const get_all_staff_url = "https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff";

    axios
      .get(get_all_staff_url)
      .then((response) => {
        const staffs = response.data.map((staff) => {
            return {
              name: staff.first_name + " " + staff.last_name
            }
        });
        setStaffMembers(staffs)
      })
      .catch((error) => {
        console.error("Failed to get all staff: ", error);
      });
  };

  
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