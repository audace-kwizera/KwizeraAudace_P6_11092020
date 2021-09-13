/** Importation de express */
const express = require('express');

/** Création d'un router avec la méthode router d'express */
const router = express.Router();

/** Importation des sauces */
const sauceCtrl = require('../controllers/sauces');


module.exports = router;