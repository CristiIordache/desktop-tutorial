const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware to parse JSON body (for future POST/PUT requests)
app.use(express.json());

// 1. Handle GET request to fetch all players
app.get('/api/players', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'player.json'), 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading player data');
    } else {
      res.send(JSON.parse(data)); // Send player data
    }
  });
});

// 2. Handle GET request to fetch a specific player by ID
app.get('/api/players/:id', (req, res) => {
  const playerId = parseInt(req.params.id);
  fs.readFile(path.join(__dirname, 'data', 'player.json'), 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading player data');
    } else {
      const players = JSON.parse(data);
      const player = players.find(p => p.id === playerId);
      if (player) {
        res.send(player);
      } else {
        res.status(404).send('Player not found');
      }
    }
  });
});

// Server listens on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
