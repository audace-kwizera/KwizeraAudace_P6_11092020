/** Importation des sauces */
const Sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
    /** pour retirer le champs id de la requete */
    delete req.body._id;
    const sauce = new Sauce({
        /** Copie des champs du modèle dans la requetes */
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    /** modification d'une sauce dans la base de données */
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id:req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id:req.param.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    /** id du thing soit le même que le params de requête ici */
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};