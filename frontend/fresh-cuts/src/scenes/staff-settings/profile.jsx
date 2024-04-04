import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { Box, CssBaseline, Typography, Avatar } from "@mui/material";

const UserProfile = () => {
  const { name, userEmail, userPhone } = useContext(AuthContext);

  const [firstName, lastName] = name.split(' ');

  return (
    <CssBaseline>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          // backgroundColor: "#f5f5f5",
          padding: "2rem"
        }}
      >
        <Avatar sx={{ width: 56, height: 56, marginBottom: "1rem" }}> {firstName.charAt(0)} </Avatar>
        <Typography variant="h4" component="div" gutterBottom>
          {firstName} {lastName}
        </Typography>
        <Typography variant="body1" gutterBottom>Email: {userEmail}</Typography>
        <Typography variant="body1" gutterBottom>Phone Number: {userPhone}</Typography>
      </Box>
    </CssBaseline>
  );
};

export default UserProfile;
