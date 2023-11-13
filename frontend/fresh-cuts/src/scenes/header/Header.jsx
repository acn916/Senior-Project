import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom"
import Image from "../../pictures/redsalonart.png"


const pages = ['Home', 'Staff', 'Services'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar style={{background: "white" }} position="static"> {/*Appbar creates the physical header */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Link to="/">
            <Box 
              component="img" 
              sx={{display: {xs: 'none', md: 'flex'}, 
              mr: 1, height: 100, 
              width: 140, marginLeft: 5}} 
              src={Image}
            />
          </Link>
          
          
          {/*<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />*/}

          {/*This is when the screen is smaller*/}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon style={{color: "black"}}/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link style={{textDecoration: "none", color: "black"}} to={`/${page}`}> {page}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>


          {/*Logo appears when the screen is smaller */}
          <Box component="img" sx={{display: {xs: 'flex', md: 'none'}, mr: 1, height: 60, width: 75}} src={Image}></Box>

          {/*<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />*/}
          {/*Originally for text but erased to make red salon art appear in middle */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>
          
          {/* Home Staff Services tabs on the header */}
          <Box sx={{flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 4, color: 'white', marginLeft: 7, display: 'block', ':hover': {bgcolor: 'white'}}}
              >
                <Link style={{textDecoration: "none", color: "black"}} to={`/${page}`}> {page}</Link>
              </Button>
            ))}
          </Box>

          <Button component={Link} to="/Login" style={{color: "black"}}> Login </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;