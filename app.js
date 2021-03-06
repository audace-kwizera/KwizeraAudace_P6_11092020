/**
 * Importation de Express
 */
const express = require('express');

/** Importation bodyParser */
const bodyParser = require('body-parser');

/**
 * Package pour faciliter les interaction avec la base de donnée Mongoose 
 * du coup pour on va l'importer 
 * */
 const mongoose = require('mongoose');

 /** Importation de node */
 const path = require('path');

 /** Importation du router */
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

require('dotenv').config()

/** Notre application */
const app = express();

mongoose.connect(process.env.DB_SK,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

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

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;