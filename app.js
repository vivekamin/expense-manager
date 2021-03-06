const express = require('express');
const mongoose = require('mongoose');

const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

//const process_env = require('./env_var/env')

const expensesRoutes = require('./api/routes/expenses');
console.log(process.env.USERNM);
console.log(process.env.PASSWD);



mongoose.connect('mongodb://'+process.env.USERNM+':'+process.env.PASSWD+'@expense-manager-shard-00-00-xmdye.mongodb.net:27017,expense-manager-shard-00-01-xmdye.mongodb.net:27017,expense-manager-shard-00-02-xmdye.mongodb.net:27017/test?ssl=true&replicaSet=expense-manager-shard-0&authSource=admin',{
   
    useMongoClient:true 
});
mongoose.Promise = require('bluebird');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, UPDATE, DELETE, PATCH');
        return res.status(200).json({})
    }
    next()
});

app.use('/expense', expensesRoutes);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status  = 404
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : error.message
    });
});

module.exports = app;