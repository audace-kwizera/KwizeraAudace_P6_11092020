/**
 * Importation du package http
 */
const http = require('http');

const app = require('./app');

app.set('port', process.env.PORT || 3000);

/**
 * création server
 */
const server = http.createServer(app);

/**
 * //////////////////////////////////////////
 * A mettre dans un fichier .env
 * //////////////////////////////////////////
 */
server.listen(process.env.PORT || 3000);
/**
 * //////////////////////////////////////////
 * A mettre dans un fichier .env
 * //////////////////////////////////////////
 */