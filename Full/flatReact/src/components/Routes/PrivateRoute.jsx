//\Full\flatReact\src\components\Routes\PrivateRoute.jsx


import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../Loading/LoadingSpinner'; // Asigură-te că acest fișier există

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth(); // Context pentru autentificare

  if (isLoading) {
    return <LoadingSpinner />; // Spinner de încărcare
  }

  return isAuthenticated ? children : <Navigate to="/login" />; // Navighează la "/login" dacă utilizatorul nu e autentificat
};

export default PrivateRoute;
