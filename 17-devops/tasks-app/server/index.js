const express = require('express');
const cors = require('cors');
const os = require('os');
const { pool, initDb } = require('./db');

const app = express();
app.use(cors()); // allow the frontend (S3 / another port) to call us
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Health check - "am I alive, and can I reach the database?"
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    // os.hostname() inside a container = the container ID. Nice for demos!
    res.json({ status: 'ok', db: 'connected', host: os.hostname() });
  } catch (err) {
    res.status(500).json({ status: 'error', db: err.message });
  }
});

app.get('/api/tasks', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
  res.json(rows);
});

app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });

  const [result] = await pool.query('INSERT INTO tasks (title) VALUES (?)', [title]);
  res.status(201).json({ id: result.insertId, title, done: false });
});

app.patch('/api/tasks/:id', async (req, res) => {
  await pool.query('UPDATE tasks SET done = NOT done WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

app.delete('/api/tasks/:id', async (req, res) => {
  await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
  res.status(204).end();
});

// Error handler. Express 5 sends errors from async routes here automatically.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

initDb()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 API listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Could not connect to the database:', err.message);
    process.exit(1); // crash -> Docker's restart policy will try again
  });
