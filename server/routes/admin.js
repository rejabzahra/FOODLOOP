const express = require('express');
const db = require('../database/db');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(authorizeRole('admin'));

// Get platform statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await db.getAsync('SELECT * FROM platformStats ORDER BY id DESC LIMIT 1');
    
    // Get additional stats
    const totalDonations = await db.getAsync('SELECT COUNT(*) as count FROM donations WHERE deletedAt IS NULL');
    const totalUsers = await db.getAsync('SELECT COUNT(*) as count FROM users');
    const activeDonations = await db.getAsync("SELECT COUNT(*) as count FROM donations WHERE status = 'available' AND deletedAt IS NULL");
    const pendingRequests = await db.getAsync("SELECT COUNT(*) as count FROM requests WHERE status = 'pending'");

    res.json({
      ...stats,
      totalDonations: totalDonations.count,
      totalUsers: totalUsers.count,
      activeDonations: activeDonations.count,
      pendingRequests: pendingRequests.count
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await db.allAsync(
      'SELECT id, email, role, name, phone, city, createdAt FROM users ORDER BY createdAt DESC'
    );
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all donations (including deleted)
router.get('/donations', async (req, res) => {
  try {
    const donations = await db.allAsync(
      `SELECT d.*, u.name as donorName, u.email as donorEmail
       FROM donations d
       JOIN users u ON d.donorId = u.id
       ORDER BY d.createdAt DESC`
    );
    res.json(donations);
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Restore deleted donation
router.put('/donations/:id/restore', async (req, res) => {
  try {
    await db.runAsync(
      'UPDATE donations SET deletedAt = NULL, status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      ['available', req.params.id]
    );

    await db.runAsync(
      'INSERT INTO auditLogs (userId, action, resourceType, resourceId, details) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, 'RESTORE', 'donation', req.params.id, 'Restored donation']
    );

    res.json({ message: 'Donation restored successfully' });
  } catch (error) {
    console.error('Restore donation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete donation permanently (admin)
router.delete('/donations/:id', async (req, res) => {
  try {
    await db.runAsync('DELETE FROM donations WHERE id = ?', [req.params.id]);

    await db.runAsync(
      'INSERT INTO auditLogs (userId, action, resourceType, resourceId, details) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, 'DELETE', 'donation', req.params.id, 'Permanently deleted donation']
    );

    res.json({ message: 'Donation deleted permanently' });
  } catch (error) {
    console.error('Delete donation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get audit logs
router.get('/audit-logs', async (req, res) => {
  try {
    const logs = await db.allAsync(
      `SELECT al.*, u.name as userName, u.email as userEmail
       FROM auditLogs al
       LEFT JOIN users u ON al.userId = u.id
       ORDER BY al.createdAt DESC
       LIMIT 100`
    );
    res.json(logs);
  } catch (error) {
    console.error('Get audit logs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update platform stats
router.put('/stats', async (req, res) => {
  try {
    const { mealsServed, donorsJoined, receiversHelped, citiesCovered } = req.body;

    await db.runAsync(
      `UPDATE platformStats 
       SET mealsServed = COALESCE(?, mealsServed),
           donorsJoined = COALESCE(?, donorsJoined),
           receiversHelped = COALESCE(?, receiversHelped),
           citiesCovered = COALESCE(?, citiesCovered),
           lastUpdated = CURRENT_TIMESTAMP`
      , [mealsServed, donorsJoined, receiversHelped, citiesCovered]
    );

    res.json({ message: 'Stats updated successfully' });
  } catch (error) {
    console.error('Update stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await db.getAsync('SELECT * FROM users WHERE id = ?', [id]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent deleting admin users
    if (user.role === 'admin') {
      return res.status(400).json({ error: 'Cannot delete admin users' });
    }

    // Delete user
    await db.runAsync('DELETE FROM users WHERE id = ?', [id]);

    // Log the action
    await db.runAsync(
      'INSERT INTO auditLogs (userId, action, resourceType, resourceId, details) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, 'DELETE', 'user', id, `Deleted user: ${user.email}`]
    );

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
