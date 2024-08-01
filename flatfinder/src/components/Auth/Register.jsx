// Importă React și useState pentru a gestiona starea componentei
import React, { useState } from 'react';
// Importă funcția Firebase pentru crearea unui utilizator cu email și parolă
import { createUserWithEmailAndPassword } from 'firebase/auth';
// Importă obiectele de autentificare și Firestore din serviciul Firebase
import { auth, db } from '../../services/firebase';
// Importă componentele de UI din Material-UI pentru construirea formularului
import { TextField, Button, Container } from '@mui/material';
// Importă funcțiile Firestore pentru adăugarea documentelor
import { collection, addDoc } from 'firebase/firestore';
// Importă hook-ul useNavigate din React Router pentru navigarea între pagini
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // Declara variabilele de stare pentru email, parolă, nume, prenume și data nașterii
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  // Declara variabila de stare pentru mesajele de eroare
  const [error, setError] = useState('');
  // Obține funcția de navigare din React Router pentru a schimba paginile
  const navigate = useNavigate();

  // Funcția care se ocupă cu trimiterea formularului de înregistrare
  const handleSubmit = async (e) => {
    // Previne comportamentul implicit al formularului (care ar fi să reîncarce pagina)
    e.preventDefault();
    try {
      // Încearcă să creeze un nou utilizator cu emailul și parola furnizate
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Obține obiectul utilizatorului

      // Adaugă informațiile utilizatorului în colecția "users" din Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid, // Identificatorul unic al utilizatorului
        email, // Emailul utilizatorului
        firstName, // Prenumele utilizatorului
        lastName, // Numele de familie al utilizatorului
        birthDate, // Data nașterii utilizatorului
      });

      // Dacă înregistrarea reușește, navighează către pagina principală
      navigate('/');
    } catch (err) {
      // Dacă apare o eroare, setează mesajul de eroare
      setError(err.message);
    }
  };

  return (
    // Containerul din Material-UI pentru a centra și organiza formularul
    <Container>
      {/* Formularul pentru înregistrare */}
      <form onSubmit={handleSubmit}>
        {/* Câmp pentru email */}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        {/* Câmp pentru parolă */}
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        {/* Câmp pentru prenume */}
        <TextField
          label="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
        />
        {/* Câmp pentru nume de familie */}
        <TextField
          label="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
        />
        {/* Câmp pentru data nașterii */}
        <TextField
          label="Birth Date"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }} // Asigură că eticheta este vizibilă pentru câmpurile de tip date
        />
        {/* Butonul pentru trimiterea formularului */}
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
        {/* Afișează mesajul de eroare dacă există */}
        {error && <p>{error}</p>}
      </form>
    </Container>
  );
};

export default Register;
