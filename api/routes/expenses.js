const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Expense = require('../models/expense');

router.get('/', (req, res, next) => {

    Expense.find()
        .select('name amount _id')
        .exec()
        .then( docs => {
            const response = {
                count: docs.length,
                expenses: docs.map( doc => {
                    return {
                        name: doc.name,
                        amount: doc.amount,
                        date: doc.date,
                        _id: doc._id,
                        request:{
                            type: 'GET',
                            url: `http://localhost:8000/expense/${doc._id}`
                        }
                        
                    }
                })
            };
            //console.log(docs);
            res.status(200).json(response);
            
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
        amount: req.body.amount,
        date: req.body.date
    });

    expense
        .save()
        .then( result => {
            console.log(result);
            res.status(200).json({
                message: "Expense Created",
                expense:{
                    name: result.name,
                    amount: result.amount,
                    date: result.date,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: `http://localhost:8000/expense/${result._id}`
                    }
                }
            });
            
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
               if(doc){
                res.status(200).json({
                    expense: doc,
                    request:{
                        type: 'GET',
                        url: `http://localhost:8000/expense/${doc._id}`
                    }
                });
               } else {
                   res.status(400).json({
                       message: "No valid Entry Found"
                   })
               }
               
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
            res.status(200).json({
                message: "Expense updated",
                updatedExpense: {
                    type: 'GET',
                    url: `http://localhost:8000/expense/${id}`
                }
            })
            
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
            res.status(200).json({
                message: "Expense Deleted",
                request: {
                    type: 'POST',
                    url: 'http://localhost:8000/expense',
                    body: { name: 'String', amount: 'Number', date: 'Date' }
                }
            })
            
        })
        .catch(error => {
            //console.log(error);
            res.status(500).json({
                error: error
            })
            
        });
    
});

module.exports = router;