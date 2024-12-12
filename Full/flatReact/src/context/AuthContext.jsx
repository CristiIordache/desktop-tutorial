// C:\Users\Cristian Iordache\Desktop\Teme.html\githab\desktop-tutorial\Full\flatReact\src\context\AuthContext.jsx

import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/users/profile")
        .then(({ data }) => setCurrentUser(data))
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ currentUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
