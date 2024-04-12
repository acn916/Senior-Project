import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { Box, CssBaseline, Typography, Avatar, Paper, Stack } from "@mui/material";

const UserProfile = () => {
  const { name, userEmail, userPhone } = useContext(AuthContext);

  const [firstName, lastName] = name.split(' ');

  const paperStyle = { padding: 10, height: '300px', width: '100%', maxWidth: '400px', margin: "10px auto" };

  return (
    <CssBaseline>
      <Paper elevation={2} style={paperStyle}>
         <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
          <Avatar sx={{ width: 80, height: 80, marginTop:'30px' }}>{name[0]}</Avatar>
          <Typography variant="h5" marginTop='15px'>{firstName} {lastName} </Typography>
          <Stack>
            <Typography variant="body1" marginTop='15px'>Email: {userEmail}</Typography>
            <Typography variant="body1" marginTop='15px'>Phone Number: {userPhone}</Typography>
          </Stack>
        </Box>
      </Paper>
    </CssBaseline>
  );
};

export default UserProfile;