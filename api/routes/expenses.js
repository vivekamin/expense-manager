const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Expense = require('../models/expense');

router.get('/', (req, res, next) => {

    Expense.find()
        .exec()
        .then( docs => {
            console.log(docs);
            res.status(200).json(docs);
            
        })
        .catch( error => {
            console.log(error);
            res.status(500).json({
                error: error
            })
        });
            
});

router.post('/', (req, res, next) => {

    const expense = new Expense({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        amount: req.body.amount
    });

    expense
        .save()
        .then( result => {
            console.log("sfdsfdsf");
            
            console.log(result);
            
        }).catch( error => {
            console.log(error);
            
        });

    res.status(200).json({
        message: "Expense Created",
        data: expense
    });
});

router.get('/:expenseId', (req, res, next) => {
    const id = req.params.expenseId;
    Expense.findById(id).exec()
           .then( doc => {
               console.log('From DB',doc);
               res.status(200).json(doc)
           })
           .catch( err => {
               console.log(err);
               res.status(500).json(err)
           });
});

router.patch('/:expenseId', (req, res, next) => {
    const id = req.params.expenseId;
    res.status(200).json({
        message: `PATCH Request for product ${id}`,
        id: id
    });
});

router.delete('/:expenseId', (req, res, next) => {
    const id = req.params.expenseId;
    res.status(200).json({
        message: `DELETED product ${id}`,
        id: id
    });
});

module.exports = router;