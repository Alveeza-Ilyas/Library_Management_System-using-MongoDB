const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  memberID: { type: Number},
  name: { type: String},
  email: { type: String},
  phone: { type: String },
  membership: { type: String},
  booksBorrowed: { type: Number, default: 0 },
  joinDate: { type: Date, default: Date.now },
  status: { type: String, default: 'active' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Member', memberSchema);
