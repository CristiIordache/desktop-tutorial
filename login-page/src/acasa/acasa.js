import React from 'react';
import './Home.css';
import LogoutButton from '../componente/buton/LogoutButton';

const Home = ({ onLogout }) => {
  return (
    <div className="home-container">
      <h1>Bine ai venit acasă!</h1>
      <p>Aceasta este pagina principală după logare.</p>
      <LogoutButton onLogout={onLogout} /> 
    </div>
  );
};

export default Home;
