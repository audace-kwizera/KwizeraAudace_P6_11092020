/**
 * Importation de Express
 */
const express = require('express');

/** Notre application */
const app = express();

app.use((req, res) => {
    res.json({ message: 'Hello' });
});

module.exports = app;