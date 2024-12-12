// C:\Users\Cristian Iordache\Desktop\Teme.html\githab\desktop-tutorial\Full\flatReact\src\components\Home\Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Grid, Box, Container } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
  
  
const Home = () => {
  const navigate = useNavigate();
  // const { currentUser } = useAuth(); // Accesează utilizatorul curent
  // useEffect(() => {
  //   console.log(currentUser )
  // },[]) 
  
  return (
    <Container className="fade-in">
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 4 } }}>
        <Typography variant="h2" gutterBottom sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
          Welcome to FlatFinder
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}>
          Your journey to find the perfect flat starts here.
        </Typography>
        {currentUser && (
          <Typography variant="h6" sx={{ mt: 2 }}>
            Hello, {currentUser.email}
          </Typography>
        )}
      </Box>

      {/* Features Section */}
      <Typography variant="h4" gutterBottom align="center" sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
        Features
      </Typography>
      <Grid container spacing={2} sx={{ mb: { xs: 2, md: 4 } }}>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ p: { xs: 1, md: 2 }, borderRadius: 2, boxShadow: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
              Track Your Apartment Choices
            </Typography>
            <Typography variant="body2">
              Focus on tracking your personal potential apartments.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ p: { xs: 1, md: 2 }, borderRadius: 2, boxShadow: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
              Manage Your Listings
            </Typography>
            <Typography variant="body2">
              Update and manage your existing listings to ensure they remain accurate and appealing.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ p: { xs: 1, md: 2 }, borderRadius: 2, boxShadow: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
              Discover New Apartments
            </Typography>
            <Typography variant="body2">
              Browse our extensive collection of flats to find the perfect home for you.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Conditional Buttons for Logged-In Users */}
      {currentUser ? (
        <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 4 } }}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => navigate('/flats/new')}
            sx={{ fontSize: { xs: '1rem', md: '1.5rem' }, padding: { xs: '0.5rem 1.5rem', md: '1rem 3rem' } }}
          >
            Add New Flat
          </Button>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => navigate('/flats/1/edit')}
            sx={{ fontSize: { xs: '1rem', md: '1.5rem' }, padding: { xs: '0.5rem 1.5rem', md: '1rem 3rem' } }}
          >
            Edit Flat
          </Button>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => navigate('/flats/1')}
            sx={{ fontSize: { xs: '1rem', md: '1.5rem' }, padding: { xs: '0.5rem 1.5rem', md: '1rem 3rem' } }}
          >
            View Flats
          </Button>
        </Box>
      ) : (
        <Typography variant="h6" gutterBottom align="center" sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}>
          Please register or login to access all features.
        </Typography>
      )}

      {/* Testimonials Section */}
      <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 4 }, mx: 'auto', maxWidth: '42rem' }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}>
          What Our Users Say
        </Typography>
        <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}>
          "FlatFinder helped me find my perfect home! The process was smooth and easy."
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 1, fontSize: { xs: '0.8rem', md: '1rem' } }}>
          - Satisfied User
        </Typography>
      </Box>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', pt: 2, pb: 2, backgroundColor: 'primary.dark', color: 'white' }}>
        <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}>
          Â© 2024 FlatFinder. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
