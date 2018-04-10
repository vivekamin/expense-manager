const http = require('http');
const app = require('./app');

//const process_env = require('./env_var/env');

const port = process.env.PORT || 8000;
console.log(`Running on ${port} and user is ${process.env.USERNAME}`);
        
const server = http.createServer(app);

server.listen(port);
