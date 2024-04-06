const { Pool } = require('pg');
// Initialize PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'internshala',
    password: 'admin',
    port: 5432,
  });

  // Verify database connection
pool.connect((err, client, release) => {
    if (err) {
      console.error('Error connecting to PostgreSQL database:', err);
      return;
    }
    console.log('Connected to PostgreSQL database');
    release(); // Release the client back to the pool
  });

  module.exports = pool;