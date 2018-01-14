const http = require('http');
const app = require('./app');

const process_env = require('./env');

const port = process_env.PORT || 8000;
console.log(`Running on ${port} and user is ${process_env.USERNAME}`);
        
const server = http.createServer(app);

server.listen(port);
