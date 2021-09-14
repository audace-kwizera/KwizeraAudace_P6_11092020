/** Importation de express */
const express = require('express');

/** Création d'un router avec la méthode router d'express */
const router = express.Router();

/** Importation des users */
const userCtrl = require('../controllers/user');

/** Création des routes post car le front end 
 * enverra l'addresse mail et le mot de passe 
 * */
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login)


module.exports = router;