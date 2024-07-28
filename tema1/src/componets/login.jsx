import React, { useState,useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useAuth } from "../contexts/authContext";
import { doSignInWithEmailAndPassword } from "../auth";
import { useNavigate } from "react-router-dom";
import Header from "./header";

function Login() {
    const navigate = useNavigate();
    const { currentUser, userLoggedIn, loading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);

    useEffect(() => {
        if (currentUser) {
            navigate('/')
        }
    })

    async function handleClick() {
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                const user = await doSignInWithEmailAndPassword(email, password);
                console.log(user);
                setIsSigningIn(false);
                navigate("/");
            } catch (error) {
                console.error(error);
                setIsSigningIn(false);
            }
        }
    }

    return (
        <>
            <Header></Header>
            <h1>Login</h1>
            <TextField
                required
                id="email"
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                required
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                fullWidth
            />
            <Button
                variant="contained"
                onClick={handleClick}
                disabled={isSigningIn}
                style={{ marginTop: '1em' }}
            >
                {isSigningIn ? 'Signing In...' : 'Login'}
            </Button>
        </>
    );
}

export default Login;
