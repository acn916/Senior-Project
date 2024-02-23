import React, { useState } from 'react';
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Setting from "../settings/index";
import StylistEditor from './StylistEditor';

const SettingsPage = () => {
  const [activePage, setActivePage] = useState("");

  const handleTextClick = (page) => {
    setActivePage(page);
  };

  const theme = createTheme({
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{ height: "100vh" }}>
        <Grid item xs={2}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              pt: 3,
              bgcolor: "#FAFBFF",
            }}
          >
            <List>
              <ListItem>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      component="span"
                      variant="subtitle1" // Changed to subtitle1 to match the default primary text size
                      sx={{
                        display: "block",
                        color: "#E95252",
                        fontWeight: "bold",
                      }}
                    >
                      Settings
                    </Typography>
                  }
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        display: "block",
                        ml: 0.2,
                        color: "text.secondary",
                      }}
                    >
                      Site Settings
                    </Typography>
                  }
                />
              </ListItem>
              {/* Clickable Text for different settings pages */}
              <ListItemButton
                selected={activePage === "stylist"}
                sx={{
                  ".MuiTouchRipple-root": {
                    display: "none", // Disables the ripple effect
                  },
                }}
                onClick={() => handleTextClick("stylist")}
              >
                <ListItemText
                  primary="Add/Remove Stylist"
                  sx={{ textAlign: "center", color: "#052B74" }}
                />
              </ListItemButton>
              <ListItemButton
                selected={activePage === "service"}
                sx={{
                  ".MuiTouchRipple-root": {
                    display: "none", // Disables the ripple effect
                  },
                }}
                onClick={() => handleTextClick("service")}
              >
                <ListItemText
                  primary="Add/Remove Service"
                  sx={{ textAlign: "center", color: "#052B74" }}
                />
              </ListItemButton>
            </List>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Box
            sx={{
              bgcolor: "white",
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {/* Conditional rendering of the main content area */}
            {activePage === "stylist" && (
              <StylistEditor />
            )}
            {activePage === "service" && (
              <>
                <Typography variant="h4" gutterBottom fontWeight={700}>
                  Add/Remove Service
                </Typography>
                <Box sx={{ height: "16px" }} />
                <Setting />
              </>
            )}
            {activePage === "" && (
              <Typography variant="h4" gutterBottom fontWeight={700}>
                Select a setting to edit
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SettingsPage;
