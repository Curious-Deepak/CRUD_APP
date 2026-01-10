require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'crud_app',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
  });

  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT 1 AS ok');
    console.log('DB connection successful:', rows[0]);
    conn.release();
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('DB connection failed:');
    console.error(err.message || err);
    process.exit(1);
  }
}

testConnection();
