// userModel.js
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'sql7.freesqldatabase.com',
  user: 'sql7731579',
  password: '4QiUGFnWPL',
  database: 'sql7731579',
  port: 3306,
});

async function createTable() {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
      );
    `);
    connection.release();
  } catch (error) {
    console.error(error);
  }
}

createTable();

async function createUser(email, password) {
  try {
    const connection = await pool.getConnection();
    await connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
    connection.release();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser
};