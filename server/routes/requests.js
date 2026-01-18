const express = require('express');
const db = require('../database/db');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Create request (Receiver only)
router.post('/', authenticateToken, authorizeRole('receiver'), async (req, res) => {
  try {
    const { donationId, message } = req.body;

    if (!donationId) {
      return res.status(400).json({ error: 'Donation ID required' });
    }

    // Check if donation exists and is available
    const donation = await db.getAsync('SELECT * FROM donations WHERE id = ? AND deletedAt IS NULL', [donationId]);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    if (donation.status !== 'available') {
      return res.status(400).json({ error: 'Donation is not available' });
    }

    // Check if request already exists
    const existingRequest = await db.getAsync(
      'SELECT * FROM requests WHERE donationId = ? AND receiverId = ? AND status = ?',
      [donationId, req.user.id, 'pending']
    );

    if (existingRequest) {
      return res.status(400).json({ error: 'Request already sent' });
    }

    const result = await db.runAsync(
      'INSERT INTO requests (donationId, receiverId, message) VALUES (?, ?, ?)',
      [donationId, req.user.id, message || null]
    );

    res.status(201).json({ message: 'Request sent successfully', id: result.id });
  } catch (error) {
    console.error('Create request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Accept/Reject request (Donor only)
router.put('/:id/respond', authenticateToken, authorizeRole('donor'), async (req, res) => {
  try {
    const { status } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Use "accepted" or "rejected"' });
    }

    // Get request with donation info
    const request = await db.getAsync(
      `SELECT r.*, d.donorId, d.title as donationTitle
       FROM requests r
       JOIN donations d ON r.donationId = d.id
       WHERE r.id = ?`,
      [req.params.id]
    );

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    if (request.donorId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Update request
    if (status === 'accepted') {
      // Get donor contact info
      const donor = await db.getAsync('SELECT name, email, phone FROM users WHERE id = ?', [req.user.id]);
      
      await db.runAsync(
        `UPDATE requests 
         SET status = ?, donorContact = ?, updatedAt = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [status, JSON.stringify({ name: donor.name, email: donor.email, phone: donor.phone }), req.params.id]
      );

      // Update donation status
      await db.runAsync(
        'UPDATE donations SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
        ['reserved', request.donationId]
      );

      // Reject other pending requests for this donation
      await db.runAsync(
        'UPDATE requests SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE donationId = ? AND id != ? AND status = ?',
        ['rejected', request.donationId, req.params.id, 'pending']
      );
    } else {
      await db.runAsync(
        'UPDATE requests SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
        [status, req.params.id]
      );
    }

    res.json({ message: `Request ${status} successfully` });
  } catch (error) {
    console.error('Respond to request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark request as completed (Donor only)
router.put('/:id/complete', authenticateToken, authorizeRole('donor'), async (req, res) => {
  try {
    const request = await db.getAsync(
      `SELECT r.*, d.donorId
       FROM requests r
       JOIN donations d ON r.donationId = d.id
       WHERE r.id = ?`,
      [req.params.id]
    );

    if (!request || request.donorId !== req.user.id) {
      return res.status(404).json({ error: 'Request not found or access denied' });
    }

    // Update request
    await db.runAsync(
      'UPDATE requests SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      ['completed', req.params.id]
    );

    // Update donation
    await db.runAsync(
      'UPDATE donations SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      ['completed', request.donationId]
    );

    // Update platform stats
    await db.runAsync('UPDATE platformStats SET mealsServed = mealsServed + 1');

    res.json({ message: 'Request marked as completed' });
  } catch (error) {
    console.error('Complete request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get requests for my donations (Donor)
router.get('/donor/my', authenticateToken, authorizeRole('donor'), async (req, res) => {
  try {
    const requests = await db.allAsync(
      `SELECT r.*, d.title as donationTitle, d.pickupLocation, u.name as receiverName, u.email as receiverEmail
       FROM requests r
       JOIN donations d ON r.donationId = d.id
       JOIN users u ON r.receiverId = u.id
       WHERE d.donorId = ?
       ORDER BY r.createdAt DESC`,
      [req.user.id]
    );

    requests.forEach(req => {
      if (req.donorContact) {
        req.donorContact = JSON.parse(req.donorContact);
      }
    });

    res.json(requests);
  } catch (error) {
    console.error('Get donor requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get my requests (Receiver)
router.get('/receiver/my', authenticateToken, authorizeRole('receiver'), async (req, res) => {
  try {
    const requests = await db.allAsync(
      `SELECT r.*, d.title as donationTitle, d.description, d.pickupLocation, d.imageUrl,
              u.name as donorName
       FROM requests r
       JOIN donations d ON r.donationId = d.id
       JOIN users u ON d.donorId = u.id
       WHERE r.receiverId = ?
       ORDER BY r.createdAt DESC`,
      [req.user.id]
    );

    requests.forEach(req => {
      if (req.donorContact) {
        req.donorContact = JSON.parse(req.donorContact);
      }
    });

    res.json(requests);
  } catch (error) {
    console.error('Get receiver requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
