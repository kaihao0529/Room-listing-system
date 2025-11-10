import { useNavigate } from "react-router"
import './CSS/Login.css';
import { Box, Button, CardActions, CardContent, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
let count = 0;
const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleregister = () => {
        if (!username || !password) {
            alert('Please fil up all the field');
            return;
        }
        localStorage.setItem('user', JSON.stringify({ username, password }));
        alert("Register successful!");
        navigate('/');
    }

    const handleusernamechange = (event) => {
        setUsername(event.target.value);
    }
    const handlepasswordchange = (event) => {
        setPassword(event.target.value);
    }
    const sucess = () => {
        navigate('/');
    }
    return (
        <div className="login-container">
            <Box sx={{
                margin: 'auto',
                padding: '100px',
                borderRadius: '12px',
                background: "#ffffff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}>
                <CardContent sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', paddingBottom: '20px', gap: '20px' }}>
                    <Typography sx={{ color: '#ff9800', fontSize: 30, textAlign: 'center' }}>
                        Register
                    </Typography>
                    <TextField label="Username" variant="outlined" onChange={handleusernamechange} />
                    <TextField type="password" label="Password" variant="outlined" onChange={handlepasswordchange} />
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                    {/* <Button size="small" sx={{ color: '#ffffff', backgroundColor: 'orange', borderRadius: '50px', padding: '10px' }} onClick={login} >Login</Button> */}
                    <Button size="small" sx={{ color: '#ffffff', backgroundColor: 'orange', borderRadius: '50px', padding: '10px' }} onClick={handleregister}>Register</Button>
                </CardActions>
            </Box>
        </div>
    )
}

export default Register