// src/components/Admin/AllUsers.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField } from '@mui/material';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await getDocs(collection(db, 'users'));
      setUsers(usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleSaveClick = async () => {
    const userDoc = doc(db, 'users', editingUser.id);
    await updateDoc(userDoc, editingUser);
    setEditingUser(null);
  };

  return (
    <div>
      <h1>All Users</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Display Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {editingUser && editingUser.id === user.id ? (
                  <TextField
                    value={editingUser.displayName}
                    onChange={(e) => setEditingUser({ ...editingUser, displayName: e.target.value })}
                  />
                ) : (
                  user.displayName
                )}
              </TableCell>
              <TableCell>
                {editingUser && editingUser.id === user.id ? (
                  <Button onClick={handleSaveClick}>Save</Button>
                ) : (
                  <Button onClick={() => handleEditClick(user)}>Edit</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllUsers;
