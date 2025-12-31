const memberRoutes = require('./routes/members');
const transactionRoutes = require('./routes/transactions');
const bookRoutes = require('./routes/books');

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const connectDB = require('./config/db');

const app = express();

// MongoDB connect
connectDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/transactions', transactionRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Library Management System Backend Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
