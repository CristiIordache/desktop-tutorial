import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import UserTable from "./UserTable"; // Importă componenta UserTable

function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else {
      checkAdminStatus();
      fetchUsers();
    }
  }, [currentUser, navigate]);

  const fetchUsers = async () => {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(usersList);
  };

  const checkAdminStatus = async () => {
    const userDoc = doc(db, "users", currentUser.uid);
    const userSnapshot = await getDoc(userDoc);
    const userData = userSnapshot.data();
    if (userData) {
      setIsAdmin(userData.isAdmin);
    }
  };

  const handleDelete = async (userId) => {
    await deleteDoc(doc(db, "users", userId));
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditedData(user);
  };

  const handleEditChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async () => {
    const userDoc = doc(db, "users", editingUser.id);
    await updateDoc(userDoc, editedData);
    setEditingUser(null);
    fetchUsers();
  };

  const handleCloseEditDialog = () => {
    setEditingUser(null);
  };

  return (
    <div>
      <Header />
      <div>
        Hello {currentUser ? currentUser.email : "Placeholder"}
      </div>
      <UserTable
        users={users}
        isAdmin={isAdmin}
        currentUser={currentUser}
        onDelete={handleDelete}
        onEdit={handleEdit}
        editingUser={editingUser}
        editedData={editedData}
        onEditChange={handleEditChange}
        onEditSubmit={handleEditSubmit}
        onCloseEditDialog={handleCloseEditDialog}
      />
    </div>
  );
}

export default Home;
