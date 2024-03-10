import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Avatar, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Image from '../../pictures/redsalonart.png';
import { AccountContext } from '../login/Account';
import { AuthContext } from '../../AuthContext';
import './Header.css';

const pages = {
  Client: ['Home', 'Services', 'Staff'],
  Stylist: ['Dashboard', 'Settings', 'Request'],
};

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const { logout, getSession } = useContext(AccountContext);
    const { isLoggedIn, setIsLoggedIn, userRole, setUserRole, name, setName } = useContext(AuthContext);
    const [userFullName, setUserFullName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const session = await getSession();
                if (session) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                setIsLoggedIn(false);
            }
        };

        checkAuthentication();
    }, []);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleSignOut = async () => {
        await logout();
        setIsLoggedIn(false);
        setUserRole("Client");
        setName("");
        navigate('/login');
    };

    const isPageActive = (page) => {
        return location.pathname === `/${page}`;
    };

    return (
        <AppBar style={{ background: 'white' }} position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <a href="/Home">
                        <Box
                            component="img"
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                mr: 1, height: 100,
                                width: 140, marginLeft: 5
                            }}
                            src={Image}
                        />
                    </a>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon style={{ color: 'black' }} />
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
                            {pages[userRole].map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" className={isPageActive(page) ? 'active-link' : ''}>
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/${page}`}>{page}</Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box component="img" sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, height: 60, width: 75 }} src={Image}></Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                      {pages[userRole].map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center" className={isPageActive(page) ? 'active-link' : ''}>
                                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/${page}`}>{page}</Link>
                            </Typography>
                        </MenuItem>
                      ))}
                    </Box>

                    {isLoggedIn ? (
                        <>
                          <Avatar>{name[0]}</Avatar>
                          <Button onClick={handleSignOut} style={{ color: 'black' }}> Sign Out </Button>
                        </>
                    ) : (
                        <Button component={Link} to="/Login" style={{ color: 'black' }}> Login </Button>
                    )}

                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default ResponsiveAppBar;