const express = require('express');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');
require('dotenv').config();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the email already exists
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], async (err, results) => {
    if (err) {
      console.error('Error checking email in database:', err);
      res.status(500).send('Server error');
      return;
    }

    if (results.length > 0) {
      // Email already exists
      res.status(400).send('Email already exists');
      return;
    }

    // Generate a unique ID for the user
    const userId = uuidv4();

    // Hash the password using Argon2
    const hashedPassword = await argon2.hash(password);

    // Insert the new user into the database
    const insertUserQuery = 'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)';
    db.query(insertUserQuery, [userId, name, email, password], (err, result) => {
      if (err) {
        console.error('Error inserting user into database:', err);
        res.status(500).send('Server error');
        return;
      }
      const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1d' });
      res.json({ token });
      console.log('User registered successfully: ', token);
    });
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserQuery, [email], async (err, results) => {
    if (err) {
      console.error('Error checking user in database:', err);
      res.status(500).send('Server error');
      return;
    }

    if (results.length === 0) {
      // Invalid credentials
      console.log('No user found with this email');
      res.status(400).send('Invalid credentials');
      return;
    }

    // User exists, compare the password
    const user = results[0];
    console.log('User found:', user);
    const isPasswordValid = await (user.password === password);
    console.log('Password comparison result:', isPasswordValid);
    if (!isPasswordValid) {
      console.log('Password is invalid');
      res.status(400).send('Invalid credentials');
      return;
    }

    // Generate a token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
    console.log('User logged in successfully: ', token);
  });
});

module.exports = router;