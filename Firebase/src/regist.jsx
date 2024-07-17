import { useState } from "react"; // Importarea React și a hook-ului useState
import { db } from "./firebase"; // Importarea instanței bazei de date Firebase din fișierul de configurare
import { collection, addDoc } from "firebase/firestore"; // Importarea metodelor Firestore pentru interacțiunea cu baza de date
import { TextField, Button, Container, Typography, Box } from "@mui/material"; // Importarea componentelor Material-UI

function RegistrationForm() {
  // Inițializarea stării pentru a ține datele formularului cu ajutorul hook-ului useState
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Funcție pentru a gestiona schimbările din input-uri și a actualiza starea
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructurare pentru a obține numele și valoarea input-ului
    setFormData({
      ...formData, // Copierea stării curente
      [name]: value, // Actualizarea stării cu noua valoare pentru input-ul corespunzător
    });
  };

  // Funcție pentru a gestiona trimiterea formularului
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenirea comportamentului implicit al formularului

    try {
      const usersCollection = collection(db, "users"); // Obținerea unei referințe la colecția 'users' din Firestore
      await addDoc(usersCollection, formData); // Adăugarea unui nou document în colecția 'users' cu datele din formular
      alert("User registered successfully!"); // Afișarea unui mesaj de succes
      setFormData({
        name: "",
        email: "",
        password: "", // Resetarea datelor din formular la valori goale
      });
    } catch (error) {
      console.error("Error adding document: ", error); // Afișarea erorii în consolă
      alert("Error registering user. Please try again."); // Afișarea unui mesaj de eroare
    }
  };

  // Renderizarea formularului de înregistrare
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name} // Legarea valorii input-ului la starea componentului
              onChange={handleChange} // Setarea evenimentului onChange pentru a gestiona schimbările din input
              required // Marcarea câmpului ca fiind obligatoriu
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              name="email"
              value={formData.email} // Legarea valorii input-ului la starea componentului
              onChange={handleChange} // Setarea evenimentului onChange pentru a gestiona schimbările din input
              required // Marcarea câmpului ca fiind obligatoriu
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              name="password"
              value={formData.password} // Legarea valorii input-ului la starea componentului
              onChange={handleChange} // Setarea evenimentului onChange pentru a gestiona schimbările din input
              required // Marcarea câmpului ca fiind obligatoriu
            />
          </Box>
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default RegistrationForm; // Exportarea componentului pentru a fi utilizat în alte părți ale aplicației
