const express = require('express');
const db = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await db.getAsync(
      'SELECT id, email, role, name, phone, address, city, createdAt FROM users WHERE id = ?',
      [req.params.id]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Only show contact info if user is viewing their own profile or is admin
    if (user.id !== req.user.id && req.user.role !== 'admin') {
      delete user.email;
      delete user.phone;
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    // Users can only update their own profile (unless admin)
    if (parseInt(req.params.id) !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { name, phone, address, city } = req.body;

    await db.runAsync(
      `UPDATE users 
       SET name = COALESCE(?, name),
           phone = COALESCE(?, phone),
           address = COALESCE(?, address),
           city = COALESCE(?, city),
           updatedAt = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [name, phone, address, city, req.params.id]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
