const express = require('express');
const router = express.Router();
const User = require('../models/user.models');

// Route for creating a new user
router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      res.status(400).json({ error: 'Email already exists' });
    } else if (error.code === 11000 && error.keyPattern && error.keyPattern.firstName && error.keyPattern.lastName) {
      res.status(400).json({ error: 'User with the same first name and last name already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error. Either the firstname, lastname or email alrady existed on the mongodb atlas. If symptoms persist, consult IT support' });
    }
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      // User not found
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.password !== password) {
      // Incorrect password
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Successful login
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    // Handle other errors
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
