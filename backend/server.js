const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const WebSocket = require('ws');
// const { Pool } = require('pg');
const pool = require("./db.js");
const cors = require("cors");

app.use(cors());


// Middleware
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// WebSocket server for real-time updates
const wss = new WebSocket.Server({ port: 8000 });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  // Handle WebSocket messages
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  // Close WebSocket connection
  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

