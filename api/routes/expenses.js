const express = require('express');

const router = express.Router(); 

router.get('/',(req,res,next) =>{
    res.status(200).json({
        message: "GET request success"
    });
});

router.post('/',(req,res,next) =>{
    const expense = {
        name: req.body.name,
        amount: req.body.amount
    };
    res.status(200).json({
        message: "Expense Created",
        data: expense
    });
});

router.get('/:expenseId',(req,res,next) => {
    const id = req.params.expenseId;
    res.status(200).json({
        message: `GET Request for product ${id}`,
        id: id
    });
});

router.patch('/:expenseId',(req,res,next) => {
    const id = req.params.expenseId;
    res.status(200).json({
        message: `PATCH Request for product ${id}`,
        id: id
    });
});

router.delete('/:expenseId',(req,res,next) => {
    const id = req.params.expenseId;
    res.status(200).json({
        message: `DELETED product ${id}`,
        id: id
    });
});

module.exports = router;