/** Importation du hash */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
             /** Sauvegarde dans la base de donnée */
             user.save()
                .then(() => res.status(201).json({ message: string }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

/** Middleware connexion utilisateur */
exports.login = (req, res, next) => {
    /** Trouver l'user dans la db */
    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            /** Comparaison du mot de passe envoyé dans la requête avec le hash enregistré dans la db */
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'CLE_SECRETE_POUR_ENCODAGE_LOCAL',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

