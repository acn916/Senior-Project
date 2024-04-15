import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Avatar, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Image from '../../pictures/redsalonart.png';
import { AccountContext } from '../login/Account';
import { AuthContext } from '../../AuthContext';
import './Header.css';
import axios from "axios";


const pages = {
  Client: ['Home', 'Services', 'Staff'],
  Stylist: ['Dashboard', 'Settings', 'Request'],
  Admin: ['Dashboard', 'Settings', 'Request']
};

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const { logout, getSession } = useContext(AccountContext);
    const { isLoggedIn, setIsLoggedIn, userRole, setUserRole, setStaffId, name, setName } = useContext(AuthContext);
    const [userFullName, setUserFullName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [checkAppointment, setCheckAppointment] = useState(0);
    const [sessionRole, setSessionRole] = useState('');
    const [firstInitial, setFirstInitial] = useState('');

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

        const fetchAppointments = async () =>  {
            try{
              const response = await axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/appointments');

              const session = await getSession();
              const staffEmail = session.email;
    
              const staffResponse = await axios.get('https://f3lmrt7u96.execute-api.us-west-1.amazonaws.com/get_all_staff');
              const staffId = staffResponse.data.find(staff => staff.email === staffEmail).id;
              //const staffId = staffResponse.data.find(staff => (staff.first_name + " " + staff.last_name) === name).id;

              setCheckAppointment(response.data.filter(appointment => appointment.status === 'Pending' && appointment.staff_id === staffId).length);
    
            } catch(error){
              console.error("Error fetching data:'", error);
              setLoading(false);
            }
          }

          const gettingSession = async () =>  {
            try{

                const session = await getSession();
                const sessionUserRole = session['custom:user_role'];
                setSessionRole(sessionUserRole);
                setFirstInitial(session.given_name[0]);
                
            } catch(error){
              console.error("Error fetching data:'", error);
              setLoading(false);
            }
        }

        checkAuthentication();
        fetchAppointments();
        gettingSession();
        setLoading(false);
        const intervalId = setInterval(fetchAppointments, 9000);

        return () => clearInterval(intervalId);
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
        setStaffId("");
        navigate('/login');
    };

    const isPageActive = (page) => {
        return location.pathname === `/${page}`;
    };

    return (
        <AppBar style={{ background: 'white' }} position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {userRole === 'Client' ? 
                    (
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
                    )
                    :
                    (
                    <a href="/Dashboard">
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
                    )
                }
                    

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
                                        {
                                            page === 'Request' && checkAppointment > 0 ? <Link style={{ textDecoration: 'none', color: 'black' }} to={`/${page}`}>{page} <NotificationsActiveIcon sx={{marginBottom: -0.75}}/></Link> 
                                            : <Link style={{ textDecoration: 'none', color: 'black' }} to={`/${page}`}>{page}</Link>
                                        }                                    
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
                                {
                                    page === 'Request' && checkAppointment > 0 ? <Link style={{ textDecoration: 'none', color: 'black' }} to={`/${page}`}>{page} <NotificationsActiveIcon sx={{marginBottom: -0.75}}/></Link> 
                                    : <Link style={{ textDecoration: 'none', color: 'black' }} to={`/${page}`}>{page}</Link>
                                }
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