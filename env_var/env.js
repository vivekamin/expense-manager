const envs = require('dotenv').load();
console.log(envs.parsed.PORT);

module.exports = envs.parsed;