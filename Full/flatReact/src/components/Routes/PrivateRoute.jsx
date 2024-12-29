//\Full\flatReact\src\components\Routes\PrivateRoute.jsx


import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../Loading/LoadingSpinner'; // Asigură-te că acest fișier există

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  // If the user is logged in, render the children components
  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
