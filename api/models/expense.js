const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    amount: { type: Number, required: true},
    date: Date
});

module.exports = mongoose.model('Expense', expenseSchema);