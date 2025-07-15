const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Verbindung zur Datenbank aufbauen
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get('/', async (req, res) => {
  // Testabfrage an die Datenbank
  const result = await pool.query('SELECT NOW()');
  res.send('Hello World! Time from DB: ' + result.rows[0].now);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});