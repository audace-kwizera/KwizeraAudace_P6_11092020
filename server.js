/**
 * Importation du package http
 */
const http = require('http');

/**
 * création server
 */
const server = http.createServer((req, res) => {
    res.end('Voila dzdzre');
});

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