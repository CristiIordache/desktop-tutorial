import React, { useState } from 'react';
import './App.css';
import Login from './log/Login';
import Register from './Register/Register';
import Home from './acasa/acasa';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return <Home onLogout={handleLogout} />;
  }

  return (
    <div className="App">
      {currentPage === 'login' ? <Login onLogin={handleLogin} /> : <Register />}
      <div className="navigation">
        {currentPage === 'login' ? (
          <button onClick={() => setCurrentPage('register')}>Nu ai cont? Înregistrează-te</button>
        ) : (
          <button onClick={() => setCurrentPage('login')}>Ai deja cont? Loghează-te</button>
        )}
      </div>
    </div>
  );
}

export default App;
