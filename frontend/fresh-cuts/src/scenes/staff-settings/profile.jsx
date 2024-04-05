import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { Box, CssBaseline, Typography } from "@mui/material";

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
        height: "100%"
    }}
      >
        <Typography variant="body1">First Name: {firstName}</Typography>
        <Typography variant="body1">Last Name: {lastName}</Typography>
        <Typography variant="body1">Email: {userEmail}</Typography>
        <Typography variant="body1">Phone Number: {userPhone}</Typography>
      </Box>
    </CssBaseline>
  );
};

export default UserProfile;