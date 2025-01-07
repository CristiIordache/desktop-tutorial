//C:\Users\Cristian Iordache\Desktop\Teme.html\githab\desktop-tutorial\Full\flatReact\src\context\AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) fetchUserData(token);
  }, []);

  const fetchUserData = async (token) => {
    try {
      const { data } = await API.get('/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    fetchUserData(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};