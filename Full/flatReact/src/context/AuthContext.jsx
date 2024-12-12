import { createContext, useState, useContext, useEffect } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await API.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        setCurrentUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid or expired token:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    const storageToken = localStorage.getItem("token");
    setToken(storageToken)
    console.log(token);
    if (!token) return;

    verifyToken();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setToken(null)
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, isLoading, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
