// routes/leaderboardRoutes.js

const express = require('express');
const router = express.Router();

// Dummy leaderboard data (replace this with your actual data source)
let leaderboard = [];

router.get('/', (req, res) => {
  // Return the leaderboard data as JSON
  res.json(leaderboard);
});

module.exports = router;
