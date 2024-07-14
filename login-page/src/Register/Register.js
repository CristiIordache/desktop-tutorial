import React, { useState } from "react"; // Importă React și hook-ul useState pentru gestionarea stării componentelor
import "./Register.css"; // Importă fișierul CSS pentru a stiliza componenta Register
import Header from "../componente/heder/Header.js"; // Importă componenta Header din locația specificată

// Definirea componentei funcționale Register
const Register = () => {
  // Definirea stărilor pentru nume, prenume, email, password, confirmPassword, error și success
  const [firstName, setFirstName] = useState(""); // Stare pentru prenume, inițializată cu un string gol
  const [lastName, setLastName] = useState(""); // Stare pentru nume, inițializată cu un string gol
  const [email, setEmail] = useState(""); // Stare pentru email, inițializată cu un string gol
  const [password, setPassword] = useState(""); // Stare pentru parolă, inițializată cu un string gol
  const [confirmPassword, setConfirmPassword] = useState(""); // Stare pentru confirmarea parolei, inițializată cu un string gol
  const [error, setError] = useState(""); // Stare pentru mesajele de eroare, inițializată cu un string gol
  const [success, setSuccess] = useState(""); // Stare pentru mesajele de succes, inițializată cu un string gol

  const hendleRregist = (e) => {
  e.preventDefault()
}



  // Funcția care se ocupă de submiterea formularului
  const handleSubmit = (event) => {
    event.preventDefault(); // Previne comportamentul implicit de reîncărcare a paginii la submiterea formularului

    // Verifică dacă parola și confirmarea parolei coincid
    if (password !== confirmPassword) {
      setError("Parolele nu se potrivesc"); // Setează mesajul de eroare dacă parolele nu coincid
      return; // Oprește execuția funcției
    }

    // Verifică dacă emailul conține caracterul '@'
    if (!email.includes("@")) {
      setError("Emailul incorect"); // Setează mesajul de eroare dacă emailul nu conține '@'
      return; // Oprește execuția funcției
    }

    // Verifică dacă toate câmpurile sunt completate
    if (firstName && lastName && email && password) {
      const users = JSON.parse(localStorage.getItem("users")) || []; // Preia lista de utilizatori din localStorage sau inițializează o listă goală
      const userExists = users.some((user) => user.email === email); // Verifică dacă există deja un utilizator cu același email

      if (userExists) {
        setError("Un utilizator cu acest email există deja"); // Setează mesajul de eroare dacă utilizatorul există deja
      } else {
        users.push({ firstName, lastName, email, password }); // Adaugă noul utilizator în lista de utilizatori
        localStorage.setItem("users", JSON.stringify(users)); // Salvează lista actualizată de utilizatori în localStorage
        setSuccess("Înregistrare reușită!"); // Setează mesajul de succes
        setError(""); // Resetează mesajul de eroare
        setFirstName(""); // Resetează câmpul prenume
        setLastName(""); // Resetează câmpul nume
        setEmail(""); // Resetează câmpul email
        setPassword(""); // Resetează câmpul parolă
        setConfirmPassword(""); // Resetează câmpul confirmare parolă
      }
    } else {
      setError("Toate câmpurile sunt obligatorii"); // Setează mesajul de eroare dacă unul dintre câmpuri nu este completat
    }
  };

  // Returnează JSX-ul pentru a renderiza componenta
  return (
    <div className="register-container">
      <Header /> {/* Afisam componenta Header */}
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Înregistrare</h2>
        {error && <p className="error">{error}</p>}{" "}
        {/* Afișează mesajul de eroare dacă există */}
        {success && <p className="success">{success}</p>}{" "}
        {/* Afișează mesajul de succes dacă există */}
        <div className="form-group">
          <label htmlFor="first-name">Prenume:</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} // Actualizează starea firstName la schimbarea valorii input-ului
            required // Face câmpul obligatoriu
          />
        </div>
        <div className="form-group">
          <label htmlFor="last-name">Nume:</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} // Actualizează starea lastName la schimbarea valorii input-ului
            required // Face câmpul obligatoriu
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Actualizează starea email la schimbarea valorii input-ului
            required // Face câmpul obligatoriu
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Parolă:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Actualizează starea password la schimbarea valorii input-ului
            required // Face câmpul obligatoriu
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirmă Parola:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Actualizează starea confirmPassword la schimbarea valorii input-ului
            required // Face câmpul obligatoriu
          />
        </div>
        <button type="submit">Înregistrează-te</button>{" "}
        {/* Butonul de submit */}
      </form>
    </div>
  );
};

export default Register; // Exportă componenta Register ca default export
