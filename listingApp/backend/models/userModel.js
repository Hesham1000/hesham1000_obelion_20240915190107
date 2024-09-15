// listingApp/backend/models/userModel.js
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'agent',
  password: 'agentpass',
  database: 'Obelion_AI',
  port: 8000,
};

const createUser = async (email, password) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [rows] = await connection.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, password]
    );
    return rows;
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
};

module.exports = { createUser };
