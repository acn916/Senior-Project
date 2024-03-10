import React, { useState } from 'react';
import {
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
  useMediaQuery,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Setting from "../settings/index";
import StylistEditor from './StylistEditor';
import ScrollableRow from './components/ScrollableRow';

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

  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const buttonsText = ['Add/Remove Stylist', 'Add/Remove Service'];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {matches ? (
        <>
          <ScrollableRow
            items={buttonsText}
            onItemClick={(item, index) => {
              console.log(`Item clicked: ${item}`);
              // Example: Updating the activePage state based on the clicked item
              if (item === 'Add/Remove Stylist') {
                setActivePage('stylist');
              } else if (item === 'Add/Remove Service') {
                setActivePage('service');
              }
            }}
          />
          <Box
            sx={{
              bgcolor: "white",
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {activePage === "stylist" && <StylistEditor />}
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
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            height: '100vh',
          }}
        >
          <Box
            sx={{
              width: '20%',
              minWidth: 190,
              height: '100%',
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
                      variant="subtitle1"
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
              <ListItemButton
                selected={activePage === "stylist"}
                sx={{
                  ".MuiTouchRipple-root": {
                    display: "none",
                  },
                }}
                onClick={() => handleTextClick("stylist")}
              >
                <ListItemText
                  primary={buttonsText[0]}
                  sx={{ textAlign: "center", color: "#052B74" }}
                />
              </ListItemButton>
              <ListItemButton
                selected={activePage === "service"}
                sx={{
                  ".MuiTouchRipple-root": {
                    display: "none",
                  },
                }}
                onClick={() => handleTextClick("service")}
              >
                <ListItemText
                  primary={buttonsText[1]}
                  sx={{ textAlign: "center", color: "#052B74" }}
                />
              </ListItemButton>
            </List>
          </Box>
          <Box
            sx={{
              width: '80%',
              bgcolor: "white",
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {activePage === "stylist" && <StylistEditor />}
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
        </Box>
      )}
    </ThemeProvider>
  );
};

export default SettingsPage;
