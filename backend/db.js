import pg from "pg";
const { Pool } = pg;
// Initialize PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "internshala",
  password: "admin",
  port: 5432,
});

export default pool;
