const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'database', 'foodloop.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

async function createAdmin() {
  try {
    const email = 'admin@foodloop.org';
    const password = 'admin123';
    const role = 'admin';
    const name = 'Admin';

    // Check if admin exists
    const existing = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (existing) {
      console.log('Admin already exists, updating password...');
      const hashedPassword = await bcrypt.hash(password, 10);
      await new Promise((resolve, reject) => {
        db.run('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email], function(err) {
          if (err) reject(err);
          else resolve();
        });
      });
      console.log('Admin password updated successfully');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await new Promise((resolve, reject) => {
        db.run('INSERT INTO users (email, password, role, name) VALUES (?, ?, ?, ?)', [email, hashedPassword, role, name], function(err) {
          if (err) reject(err);
          else resolve();
        });
      });
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    db.close();
  }
}

createAdmin();