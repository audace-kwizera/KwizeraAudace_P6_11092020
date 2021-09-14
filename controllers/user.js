/** Importation du hash */
const bcrypt = require('bcrypt');

/**Importation du modèle user */
const User = require('../models/User');

/** Middleware enregistrement nouvel utilisateur */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            /** Création de l'utilisateur */
            const user = new User({ 
                email: req.body.email,
                password: hash
             });
             user.save()
                .then(() => res.status(201).json({ message: string }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

/** Middleware connexion utilisateur */
exports.login = (req, res, next) => {

};

