const jwt = require('jsonwebtoken');

/**
 * Export du module export
 */
module.exports = (req, res, next) => {
    try {  
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SK);
        const userId = decodedToken.userId;
        /** si le user id est différent de celui dans la db on renvoi une erreur
         * sinon on continue normalement
         */
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée' })
    }
};