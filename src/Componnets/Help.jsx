import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard';

const Help = () => {
    const [isopen, setIsopen] = useState(true);
    const toggleDrawer = () => {
        setIsopen(!isopen);
    }
    useEffect(() => {
        setIsopen(isopen);
    }, []);
    return (
        <div>
            <Dashboard open={isopen} toggleDrawer={toggleDrawer} >
            </Dashboard>
        </div >
    )
}

export default Help