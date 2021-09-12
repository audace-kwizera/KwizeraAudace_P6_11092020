/**
 * Importation de Express
 */
const express = require('express');

/** Notre application */
const app = express();

/*le premier enregistre « Requête reçue ! » dans la console et passe l'exécution ;*/
app.use((req, res, next) => {
    console.log('requete');
    next();
});

/**le deuxième ajoute un code d'état 201 à la réponse et passe l'exécution ; */
app.use((req, res, next) => {
    res.status(201);
    next();
})

/**le troisième envoie la réponse JSON et passe l'exécution ; */

app.use((req, res, next) => {
    res.json({ message: 'Hello' });
    next();
});

/**le dernier élément de middleware enregistre « Réponse envoyée avec succès ! » dans la console. */

app.use((req, res) => {
    console.log('envoyé');
})

module.exports = app;