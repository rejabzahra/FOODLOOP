const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'foodloop.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
    initializeDatabase();
  }
});

function initializeDatabase() {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('donor', 'receiver', 'admin')),
    name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    city TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Donations table
  db.run(`CREATE TABLE IF NOT EXISTS donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    donorId INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    quantity TEXT NOT NULL,
    expiryDate DATE,
    pickupLocation TEXT NOT NULL,
    imageUrl TEXT,
    status TEXT DEFAULT 'available' CHECK(status IN ('available', 'reserved', 'completed', 'cancelled')),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    deletedAt DATETIME,
    FOREIGN KEY (donorId) REFERENCES users(id)
  )`);

  // Requests table
  db.run(`CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    donationId INTEGER NOT NULL,
    receiverId INTEGER NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'accepted', 'rejected', 'completed')),
    donorContact TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donationId) REFERENCES donations(id),
    FOREIGN KEY (receiverId) REFERENCES users(id)
  )`);

  // Messages table
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Audit Logs table
  db.run(`CREATE TABLE IF NOT EXISTS auditLogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    action TEXT NOT NULL,
    resourceType TEXT,
    resourceId INTEGER,
    details TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
  )`);

  // Platform Stats table
  db.run(`CREATE TABLE IF NOT EXISTS platformStats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mealsServed INTEGER DEFAULT 0,
    donorsJoined INTEGER DEFAULT 0,
    receiversHelped INTEGER DEFAULT 0,
    citiesCovered INTEGER DEFAULT 0,
    lastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Initialize default admin if not exists
  const bcrypt = require('bcryptjs');
  const defaultAdminEmail = 'admin@foodloop.org';
  const defaultAdminPassword = 'admin123';
  
  db.get('SELECT * FROM users WHERE email = ?', [defaultAdminEmail], (err, row) => {
    if (err) {
      console.error('Error checking admin:', err);
      return;
    }
    if (!row) {
      const hashedPassword = bcrypt.hashSync(defaultAdminPassword, 10);
      db.run(
        'INSERT INTO users (email, password, role, name) VALUES (?, ?, ?, ?)',
        [defaultAdminEmail, hashedPassword, 'admin', 'Food Loop Admin'],
        (err) => {
          if (err) {
            console.error('Error creating admin:', err);
          } else {
            console.log('✅ Default admin created (admin@foodloop.org / admin123)');
          }
        }
      );
    }
  });

  // Initialize platform stats
  db.get('SELECT * FROM platformStats', (err, row) => {
    if (!row) {
      db.run('INSERT INTO platformStats (mealsServed, donorsJoined, receiversHelped, citiesCovered) VALUES (?, ?, ?, ?)',
        [1250, 156, 89, 12], (err) => {
          if (!err) console.log('✅ Platform stats initialized');
        });
    }
  });
}

// Helper function to run queries as promises
db.runAsync = function(sql, params = []) {
  return new Promise((resolve, reject) => {
    this.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

db.getAsync = function(sql, params = []) {
  return new Promise((resolve, reject) => {
    this.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

db.allAsync = function(sql, params = []) {
  return new Promise((resolve, reject) => {
    this.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
};

module.exports = db;
