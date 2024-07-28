import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import { db } from "../firebase"; // Ensure you have your firebase configuration in this file
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

function Home() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const adminId = "kHtBhMiKOnUsYvKuS62El5ryWlK2";

    useEffect(() => {
        if (!currentUser) {
            navigate('/Login');
        } else {
            fetchUsers();
        }
    }, [currentUser, navigate]);

    const fetchUsers = async () => {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
    };

    const handleDelete = async (userId) => {
        await deleteDoc(doc(db, "users", userId));
        fetchUsers(); // Refresh the list after deletion
    };

    return (
        <div>
            <h1>Home</h1>
            <Header />
            <div>
                Hello {currentUser ? currentUser.email : "Placeholder"}
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="users table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell>Password</TableCell>
                            {currentUser?.uid === adminId && <TableCell>Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.dob}</TableCell>
                                <TableCell>{user.password}</TableCell>
                                {currentUser?.uid === adminId && user.id !== adminId && (
                                    <TableCell>
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            onClick={() => handleDelete(user.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Home;
