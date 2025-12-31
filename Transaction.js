const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  transactionID: { type: Number},
  bookTitle: { type: String},
  memberName: { type: String},
  borrowDate: { type: Date, default: Date.now },
  dueDate: { type: Date },
  returnDate: { type: Date, default: null },
  fine: { type: Number, default: 0 },
  status: { type: String, enum: ['borrowed', 'returned', 'overdue'], default: 'borrowed' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);
