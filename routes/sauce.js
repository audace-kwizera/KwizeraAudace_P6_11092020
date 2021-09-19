/** Importation de express */
const express = require('express');
const { default: next } = require('next');
const app = require('../app');

/** Création d'un router avec la méthode router d'express */
const router = express.Router();

/** Importation des sauces */
const sauceCtrl = require('../controllers/sauce');

/** Importation du middleware auth */
const auth = require('../middleware/auth');

/** Importer du middleware multer */
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);


module.exports = router;