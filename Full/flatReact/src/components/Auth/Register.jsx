// C:\Users\Cristian Iordache\Desktop\Teme.html\githab\desktop-tutorial\Full\flatReact\src\components\Auth\Register.jsx

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container, TextField, Button, Typography, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleIcon from '../GoogleIcon/GoogleIcon'; // Asigură-te că acest component există
import TwitterIcon from '@mui/icons-material/Twitter';
import API from '../../services/api';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  birthDate: yup.date().required('Birth date is required').test(
    'age',
    'You must be at least 18 years old',
    (value) => new Date(value) <= new Date(new Date().setFullYear(new Date().getFullYear() - 18))
  ),
});

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      birthDate: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await API.post('/users/register', values); // Folosește funcționalitatea API pentru backend
        toast.success('Registration successful!');
        navigate('/login'); // Navighează către pagina de login după succes
      } catch (error) {
        console.error('Registration failed:', error);
        toast.error(error.response?.data?.message || 'Registration failed.');
      }
    },
  });

  const handleGoogleSignIn = async () => {
    // Poți implementa integrarea Google Sign-In aici dacă este necesar
    toast.info('Google Sign-In is not implemented.');
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
      }}
    >
      <ToastContainer />
      <Box 
        sx={{ 
          width: '100%', 
          boxShadow: 3, 
          borderRadius: 2, 
          p: 3, 
          backgroundColor: 'background.paper', 
          overflowY: 'auto' 
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            textAlign: 'center', 
            color: 'primary.main' 
          }}
        >
          Register
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            margin="normal"
          />
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            margin="normal"
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
          />
          <TextField
            fullWidth
            id="birthDate"
            name="birthDate"
            label="Birth Date"
            type="date"
            value={formik.values.birthDate}
            onChange={formik.handleChange}
            error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
            helperText={formik.touched.birthDate && formik.errors.birthDate}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Button 
            color="primary" 
            variant="contained" 
            fullWidth 
            type="submit" 
            sx={{ mt: 2, backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}
          >
            Register
          </Button>
        </form>
        <Divider sx={{ my: 2 }} />
        <Typography variant='body2' align='center' color="text.secondary">
          Or sign in with:
        </Typography>
        <Button
          color="secondary"
          variant="outlined"
          fullWidth
          onClick={handleGoogleSignIn}
          sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <GoogleIcon sx={{ mr: 1 }} />
          Sign in with Google
        </Button>
        <Divider sx={{ my: 2 }} />
        <Typography variant='body2' align='center' color="text.secondary">
          You can also find us on Twitter
        </Typography>
        <Button
          color="primary"
          variant="outlined"
          fullWidth
          href="https://twitter.com/Finder_flat" 
          target="_blank"
          sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <TwitterIcon sx={{ mr: 1 }} /> 
          Twitter
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
