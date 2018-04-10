const http = require('http');
const app = require('./app');

//const process_env = require('./env_var/env');
console.log("starting...")
const port = process.env.PORT;
console.log(`Running on ${port} and user is ${process.env.USERNM}`);
        
const server = http.createServer(app);

server.listen(port);
