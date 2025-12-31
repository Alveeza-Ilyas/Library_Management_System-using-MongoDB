const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// 👉 Add new book
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    await new book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 👉 Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
