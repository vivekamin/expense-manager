const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    amount: Number
});

module.exports = mongoose.model('Expense', expenseSchema);