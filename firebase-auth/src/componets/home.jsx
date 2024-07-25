

import React, { useState,useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useAuth } from "../contexts/authContext";
import { doSignInWithEmailAndPassword } from "../auth";
import { useNavigate } from "react-router-dom";
import Header from "./header";

function Home() {
    const navigate = useNavigate()
    const { currentUser, userLoggedIn } = useAuth()
    useEffect(() => {
        if (!currentUser) {
            navigate('/Login')
        }
    })


    return (
        <div>
            <h1>Home</h1>
            <Header></Header>
            <div>
                helo {currentUser ? currentUser.email : "Placeholder"}
            </div>
        </div>
    )
}

export default  Home