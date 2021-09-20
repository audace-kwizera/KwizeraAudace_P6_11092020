/** Importation des sauces */
const Sauce = require('../models/Sauce');

/** Importation du package fs pour avoir accès aux opérations
 * liées au système de fichier
 */
const fs = require('fs');

/** pour retirer le champs id de la requete */
    /** Objet js sous forme de chaine de caractère à transformer en objet */
    /** Copie des champs du modèle dans la requetes */
    /** modification url de l'image généré par multer,
         * du coup on va générer l'url de l'image dynamique pour éviter
         * les soucis en production
         */
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [' '],
        usersDisliked: [' ']
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    /** Test pour voir si il y a une nouvelle image ou pas */
    const sauceObject = req.file ?
        {
           ...JSON.parse(req.body.sauce),
           imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
        } : { ...req.body };
    /** modification d'une sauce dans la base de données */
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id:req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    /** Recherche du fichier pour obtenir url de l'image pour supprimer le fichier */
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id:req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    /** id du sauce soit le même que le params de requête ici */
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.likeDislikeSauce = (req, res, next) => {
    const like = req.body.like;
    const userId = req.body.userId;
    const sauceId = req.body.id;
    console.log(req.body); 

    /** L'instruction switch pour évaluer l'expression et, 
     * selon le résultat obtenu et le cas associé, 
     * exécuter les instructions correspondantes.
     * Et on ajoutera brak pour finir l'instruction switch.
     * On va utiliser includes() permet de déterminer si un tableau contient 
     * une valeur et renvoie true si c'est le cas, false sinon. Selon
     * la réponse grâce à $pull on modifiera les infos pour les likes car 
     * il va enlever les infos existantes selectionné dans la db mongo db 
     * et $push ajoutera des infos */

     switch (like) {
        case -1: // dislike vaut -1 
            Sauce.updateOne({ _id: req.params.id }, { $push: {usersDisliked: userId }, $inc: { dislikes: +1 }})
                .then(() => res.status(200).json({ message: `J'aime pas :(` }))
                .catch(error => res.status(400).json({ error }));          
        break; // on a un break a ce niveau donc les instructions
        // des cas suivants ne seront pas exécutées

        case 0: // Sans avis vaut 0 
            Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                if (sauce.usersLiked.includes(userId)) {
                    Sauce.updateOne({ _id: req.params.id }, { $pull: {usersLiked: userId }, $inc: { likes: -1 }})
                        .then(() => res.status(200).json({ message: `Sans Avis` }))
                        .catch(error => res.status(400).json({ error }));
                }
                if (sauce.usersDisliked.includes(userId)) {
                    Sauce.updateOne({ _id: req.params.id }, { $pull: {usersDisliked: userId }, $inc: { dislikes: -1 }})
                        .then(() => res.status(200).json({ message: `Sans Avis` }))
                        .catch(error => res.status(400).json({ error }));
                }
            })
            .catch(error => res.status(500).json({ error }));
        break; // on a un break a ce niveau donc les instructions
               // des cas suivants ne seront pas exécutées
        
        case 1: // like vaut 1
            Sauce.updateOne({ _id: req.params.id }, { $push: {usersLiked: userId }, $inc: { likes: +1 }})
                .then(() => res.status(200).json({ message: `J'aime :)` }))
                .catch(error => res.status(400).json({ error }));
        break; // on a un break a ce niveau donc les instructions
               // des cas suivants ne seront pas exécutées
        
        default:
            console.log('default');
    }

};