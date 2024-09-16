const { createUser } = require('../models/userModel');
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'sql7.freesqldatabase.com',
  user: 'sql7731579',
  password: '4QiUGFnWPL',
  database: 'sql7731579',
  port: 3306,
});



async function registerUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  try {
    const connection = await pool.getConnection();

    const [rows] = await connection.query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      connection.release();
      return res.status(400).json({ message: 'Email is already registered' });
    }

    await createUser(email, password);

    return res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

module.exports = {
  registerUser
};