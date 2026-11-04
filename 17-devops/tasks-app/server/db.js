// All database code lives here.
// Notice: we never write "localhost" or a password in the code.
// Everything comes from ENVIRONMENT VARIABLES, so the SAME code runs:
//   - on your laptop      (DB_HOST=localhost)
//   - in Docker Compose   (DB_HOST=db          -> the service name!)
//   - on AWS              (DB_HOST=xxxx.rds.amazonaws.com)
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tasksdb',
  // RDS works best with an encrypted (SSL) connection.
  // mysql2 already knows Amazon's certificates - we only switch it on.
  ssl: process.env.DB_SSL === 'true' ? 'Amazon RDS' : undefined,
  connectionLimit: 5,
});

// Create the table on startup, so we never have to log into the DB by hand.
async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id         INT AUTO_INCREMENT PRIMARY KEY,
      title      VARCHAR(255) NOT NULL,
      done       BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

module.exports = { pool, initDb };
