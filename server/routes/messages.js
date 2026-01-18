const express = require('express');
const db = require('../database/db');

const router = express.Router();

// Submit contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await db.runAsync(
      'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );

    res.status(201).json({ message: 'Message sent successfully', id: result.id });
  } catch (error) {
    console.error('Submit message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all messages (Admin only)
router.get('/', async (req, res) => {
  try {
    // In production, add admin authentication here
    const messages = await db.allAsync(
      'SELECT * FROM messages ORDER BY createdAt DESC'
    );
    res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
