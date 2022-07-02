const http = require('http');
const app = require('./app');

const port = process.env.PORT || 5000;
const host = '0.0.0.0';
const server = http.createServer(app);

server.listen(port);