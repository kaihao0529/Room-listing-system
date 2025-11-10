import { Box, colors, Container, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Toolbar, Typography, useTheme } from "@mui/material";
import "./CSS/Dashboard.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import MuiAppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useEffect, useState } from "react";
import { orange } from "@mui/material/colors";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router";
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        padding: theme.spacing(10),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        width: '500px',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    }),
);


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
const Dashboard = ({ open, toggleDrawer, children }) => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const loginusername = JSON.parse(localStorage.getItem('user'));
        setUsername(loginusername.username)
    }, [])
    const itemlist = [
        { text: 'Home', icon: <HomeIcon />, path: '/Home' },
        { text: 'Room listing', icon: <SingleBedIcon />, path: '/roomlisting' },
        { text: 'Log out', icon: <LogoutIcon />, path: '/' }
    ];

    const itemlist1 =[
        {text: 'settings', icon:<SettingsIcon />,path:'/Settings'},
        {text: 'Help & Feedback', icon:<HelpOutlineIcon />, path:'/Help'}
    ];

    const DrawerList = (
        <Container sx={{ 
            p:{
                xl:'auto',
                lg:'auto',

            },
            }}>
            <Box sx={{ml:{
                xl:'30%'
            }}} display={"flex"}>
                <AppBar sx={{ background: 'orange' }} position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            edge="start"
                            sx={[
                                {
                                    // ml: -3,
                                    borderRadius: '0%',
                                    display: "flex",
                                    flexDirection: 'row',
                                    justifyContent: 'start',
                                    left: 20,
                                    position: 'sticky',
                                },
                            ]}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography sx={{ marginLeft: '20px' }} variant="h6" noWrap component="div">
                            Persistent drawer
                        </Typography>
                    </Toolbar>

                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor: 'orange',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    onClose={toggleDrawer}
                >
                    <div className="user-container">
                        <AccountCircleIcon sx={{ fontSize: 100, marginTop: 2, }} />
                        <h1>{username}</h1>
                    </div>
                    <div className="list-container">
                        <List>
                            {/* {['Home', 'Room listing', 'Log out'].map((text, index) => (
                            <ListItem key={index} >
                                <ListItemButton>
                                    <SingleBedIcon />
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))} */}
                            {itemlist.map((item, index) => (
                                <ListItem key={index} component={Link} to={item.path} >
                                    <ListItemButton>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText sx={{ color: 'black' }} primary={item.text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <List sx={{ position: 'absolute', bottom: 0 }}>
                            {itemlist1.map((item, index) => (
                                <ListItem key={index} component={Link} to={item.path}>
                                    <ListItemButton>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText  sx={{ color: 'black' }} primary={item.text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    {children}
                </Main>
            </Box>
        </Container>

    );
    return (
        <>
            {/* <div className='Dashboard'>
                <div className="Dashboard-container">
                <div className="Dashboard-content">
                    {DrawerList}
                </div>
            </div>
                {DrawerList}
            </div> */}
            {DrawerList}
        </>

    )
}

export default Dashboard