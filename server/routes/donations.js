const express = require('express');
const db = require('../database/db');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Get all available donations (public)
router.get('/', async (req, res) => {
  try {
    const { status, category, search } = req.query;
    let query = `
      SELECT d.*, u.name as donorName, u.email as donorEmail, u.phone as donorPhone
      FROM donations d
      JOIN users u ON d.donorId = u.id
      WHERE d.deletedAt IS NULL
    `;
    const params = [];

    if (status) {
      query += ' AND d.status = ?';
      params.push(status);
    } else {
      query += " AND d.status = 'available'";
    }

    if (category) {
      query += ' AND d.category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (d.title LIKE ? OR d.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY d.createdAt DESC';

    const donations = await db.allAsync(query, params);
    res.json(donations);
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single donation
router.get('/:id', async (req, res) => {
  try {
    const donation = await db.getAsync(
      `SELECT d.*, u.name as donorName, u.email as donorEmail, u.phone as donorPhone
       FROM donations d
       JOIN users u ON d.donorId = u.id
       WHERE d.id = ? AND d.deletedAt IS NULL`,
      [req.params.id]
    );

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.json(donation);
  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create donation (Donor only)
router.post('/', authenticateToken, authorizeRole('donor'), async (req, res) => {
  try {
    const { title, description, category, quantity, expiryDate, pickupLocation, imageUrl } = req.body;

    if (!title || !quantity || !pickupLocation) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await db.runAsync(
      `INSERT INTO donations (donorId, title, description, category, quantity, expiryDate, pickupLocation, imageUrl)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, title, description || null, category || null, quantity, expiryDate || null, pickupLocation, imageUrl || null]
    );

    // Audit log
    await db.runAsync(
      'INSERT INTO auditLogs (userId, action, resourceType, resourceId, details) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, 'CREATE', 'donation', result.id, `Created donation: ${title}`]
    );

    res.status(201).json({ message: 'Donation created successfully', id: result.id });
  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update donation (Donor only)
router.put('/:id', authenticateToken, authorizeRole('donor'), async (req, res) => {
  try {
    const { title, description, category, quantity, expiryDate, pickupLocation, imageUrl, status } = req.body;

    // Check ownership
    const donation = await db.getAsync('SELECT * FROM donations WHERE id = ? AND donorId = ?', [req.params.id, req.user.id]);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found or access denied' });
    }

    await db.runAsync(
      `UPDATE donations 
       SET title = COALESCE(?, title),
           description = COALESCE(?, description),
           category = COALESCE(?, category),
           quantity = COALESCE(?, quantity),
           expiryDate = COALESCE(?, expiryDate),
           pickupLocation = COALESCE(?, pickupLocation),
           imageUrl = COALESCE(?, imageUrl),
           status = COALESCE(?, status),
           updatedAt = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [title, description, category, quantity, expiryDate, pickupLocation, imageUrl, status, req.params.id]
    );

    res.json({ message: 'Donation updated successfully' });
  } catch (error) {
    console.error('Update donation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete donation (soft delete - Donor only)
router.delete('/:id', authenticateToken, authorizeRole('donor'), async (req, res) => {
  try {
    const donation = await db.getAsync('SELECT * FROM donations WHERE id = ? AND donorId = ?', [req.params.id, req.user.id]);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found or access denied' });
    }

    await db.runAsync(
      'UPDATE donations SET deletedAt = CURRENT_TIMESTAMP, status = ? WHERE id = ?',
      ['cancelled', req.params.id]
    );

    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error('Delete donation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get my donations (Donor)
router.get('/my/list', authenticateToken, authorizeRole('donor'), async (req, res) => {
  try {
    const donations = await db.allAsync(
      'SELECT * FROM donations WHERE donorId = ? AND deletedAt IS NULL ORDER BY createdAt DESC',
      [req.user.id]
    );
    res.json(donations);
  } catch (error) {
    console.error('Get my donations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
