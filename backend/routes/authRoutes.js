// authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require("../db.js");

// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username already exists in the database
    try {
      const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: 'Username already exists' });
      }
    } catch (error) {
      console.error('Error checking existing username:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Insert new user into the database
    try {
      await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Login route
router.post('/login', async (req, res) => {
  // Validate user credentials
  const { username, password } = req.body;

  // Fetch user from database
  try {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.user_id }, 'your_secret_key', { expiresIn: '1h' });

    // Send token to the client
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
