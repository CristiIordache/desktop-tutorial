import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../auth';
import { Button, TextField } from '@mui/material';
import Header from './header';
import { db } from '../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [isReg, setIsReg] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    async function handleClick() {
        // Prevent multiple clicks
        if (!isReg) {
            setIsReg(true);
            await doCreateUserWithEmailAndPassword(email, password).then(async (user) => {
                setIsReg(false);

                await setDoc(doc(db, "users", user.user.uid), {
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    dob: dob
                });

                setEmail("");
                setPassword("");
                setFirstName("");
                setLastName("");
                setDob("");
                navigate('/');
            }).catch((error) => {
                console.log(error);
                setErrorMessage(error.message);
                setIsReg(false);
            });
        }
    }

    return (
        <>
            <Header />
            <TextField
                required
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                required
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                required
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                required
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                required
                id="dob"
                label="Date of Birth"
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                margin="normal"
                fullWidth
            />
            <Button 
                variant="contained" 
                onClick={handleClick}
                disabled={isReg}
                style={{ marginTop: '16px' }}
            >
                Register
            </Button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </>
    );
}

export default Register;
