import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton, List, ListItem, ListItemText, styled, TextareaAutosize, TextField, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { orange } from '@mui/material/colors';
import './CSS/Home.css';

const Home = () => {
    const [isopen, setIsopen] = useState(true);
    const toggleDrawer = () => {
        setIsopen(!isopen);
    }
    useEffect(()=>{
        setIsopen(isopen);
    },[]);
    return (
        <div>
            <Dashboard open={isopen} toggleDrawer={toggleDrawer} >
        </Dashboard>
        </div >
    )
}

export default Home