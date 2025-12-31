const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// 👉 Add new transaction
router.post('/', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 👉 Get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('bookId', 'title isbn')       // Book info
      .populate('memberId', 'name email');    // Member info
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT Transaction (Return Book)
router.put('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
