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

app.get('/jobs/', async (req, res) => {
  try {
    // Alle Zeilen aus der Tabelle "jobs" abfragen
    const result = await pool.query('SELECT * FROM jobs');
    // Die Zeilen als JSON zurückgeben
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fehler beim Abrufen der Daten.' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});