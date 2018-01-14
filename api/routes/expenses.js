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
            console.log(result);
            res.status(200).json(result);
            
        }).catch( error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
            
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
    console.log(req);
    const bodyParams = req.body
    let updatedObject = req.body
   /* console.log(updatedObject);
    if (bodyParams.name){
        console.log(bodyParams.name);
        updatedObject['name'] = bodyParams.name
        
    }
    if(bodyParams.amount){
        updatedObject['amount'] = bodyParams.amount

    }   */
    Expense.update({_id: id},{$set : updatedObject})
        .exec()
        .then( result => {
            //console.log(result);
            res.status(200).json(result)
            
        })
        .catch( error => {
            //console.log(error);
            res.status(500).json({
                error:error
            })
            
        });
    
});

router.delete('/:expenseId', (req, res, next) => {
    const id = req.params.expenseId;
    Expense.remove({_id: id})
        .exec()
        .then( result => {
            //console.log(result);
            res.status(200).json(result)
            
        })
        .catch(error => {
            //console.log(error);
            res.status(500).json({
                error: error
            })
            
        });
    
});

module.exports = router;