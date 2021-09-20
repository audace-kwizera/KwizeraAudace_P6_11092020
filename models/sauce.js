/** Importation de mongoose */
const mongoose = require('mongoose');

const modelsSauce = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number },
    dislikes: { type: Number },/** +1 */
    usersLiked: { type: Array },
    usersDisliked: { type: Array }/** id */
});

module.exports = mongoose.model('Sauce', modelsSauce);