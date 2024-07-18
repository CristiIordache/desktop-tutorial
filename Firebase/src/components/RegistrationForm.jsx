import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    // Validate first name
    if (formData.firstName.length < 2) {
      tempErrors.firstName = "First Name must be at least 2 characters long.";
      isValid = false;
    }

    // Validate last name
    if (formData.lastName.length < 2) {
      tempErrors.lastName = "Last Name must be at least 2 characters long.";
      isValid = false;
    }

    // Validate birth date
    const birthDate = new Date(formData.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18 || age > 120) {
      tempErrors.birthDate = "Age must be between 18 and 120 years.";
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Invalid email format.";
      isValid = false;
    }

    // Validate password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      tempErrors.password = "Password must be at least 6 characters long and contain letters, numbers, and a special character.";
      isValid = false;
    }

    // Validate password confirmation
    if (formData.password !== formData.passwordConfirmation) {
      tempErrors.passwordConfirmation = "Passwords do not match.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const usersCollection = collection(db, "users");
        await addDoc(usersCollection, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          birthDate: formData.birthDate,
          email: formData.email,
          password: formData.password,
        });
        alert("User registered successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          birthDate: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        });
        navigate("/login");
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Error registering user. Please try again.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Birth Date"
              variant="outlined"
              fullWidth
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
              error={!!errors.birthDate}
              helperText={errors.birthDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={!!errors.email}
              helperText={errors.email}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              error={!!errors.password}
              helperText={errors.password}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type="password"
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              required
              error={!!errors.passwordConfirmation}
              helperText={errors.passwordConfirmation}
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

export default RegistrationForm;
