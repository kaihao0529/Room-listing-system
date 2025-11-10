import { Box, Button, CardActions, CardContent, Container, TextField, Typography } from "@mui/material"
import './CSS/Login.css'
import { useNavigate } from "react-router"
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handlelogin = () => {
        const storeduser = JSON.parse(localStorage.getItem('user'));
        console.log('the user is '+storeduser.username);
        console.log('the password is '+storeduser.password);
        
        if (!storeduser) {
            alert("No user found. Please register first.");
            return;
        }
        if (storeduser.username === username && storeduser.password === password) {
            alert('Login successful');
            navigate('/Home');
        } else {
            alert('Invalid username or password');
        }
    }
    const register = () => {
        navigate('/register');
    }
    const handleusernamechange = (event) => {
        setUsername(event.target.value);
    }
    const handlepasswordchange = (event) => {
        setPassword(event.target.value);
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
                        Login
                    </Typography>
                    <TextField label="Username" value={username} variant="outlined" onChange={handleusernamechange} />
                    <TextField type="password" value={password} label="Password" variant="outlined" onChange={handlepasswordchange} />

                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button size="small" sx={{ color: '#ffffff', backgroundColor: 'orange', borderRadius: '50px', padding: '10px' }} onClick={handlelogin} >Login</Button>
                    <Button size="small" sx={{ color: '#ffffff', backgroundColor: 'orange', borderRadius: '50px', padding: '10px' }} onClick={register}>Register</Button>
                </CardActions>
            </Box>
        </div>

    )
}

export default Login

