// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Sign Up
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;