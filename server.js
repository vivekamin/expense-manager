const http = require('http');
const app = require('./app');

require('dotenv').load();

const port = process.env.PORT || 8000;
console.log(`Running on ${port} and user is ${process.env.USERNAME}`);
        
const server = http.createServer(app);

server.listen(port);