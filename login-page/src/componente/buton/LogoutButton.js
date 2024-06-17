import React from 'react';
import './LogoutButton.css'; // Importă fișierul CSS

const LogoutButton = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <button className="logout-button" onClick={handleLogout}>Logout</button>
  );
  

};

export default LogoutButton;
