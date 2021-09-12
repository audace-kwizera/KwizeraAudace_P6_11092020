/**
 * Importation de Express
 */
const express = require('express');

/** Importation bodyParser */
const bodyParser = require('body-parser');

/** Notre application */
const app = express();

/**
 * Header mentionnée pour toutes les requêtes pour permettre aux users d'utiliser l'api 
 * Permettre d'utiliser certaines méthodes et accès aux users
 * Permettre communication entre le back et le front (port 3000 et 8081)
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

module.exports = app;