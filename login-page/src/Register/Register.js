import React, { useState } from 'react';
import './Register.css';
import Header from '../componente/heder/Header.js';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Parolele nu se potrivesc');
      return;
    }
    if (email && password) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.some(user => user.email === email);

      if (userExists) {
        setError('Un utilizator cu acest email există deja');
      } else {
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        setSuccess('Înregistrare reușită!');
        setError('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } else {
      setError('Toate câmpurile sunt obligatorii');
    }
  };

  return (
    <div className="register-container">
      <Header /> {/* Afisam componenta Header */}
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Înregistrare</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Parolă:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirmă Parola:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Înregistrează-te</button>
      </form>
    </div>
  );
};

export default Register;
