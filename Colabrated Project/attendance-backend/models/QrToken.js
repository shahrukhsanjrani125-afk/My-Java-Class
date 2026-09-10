const mongoose = require('mongoose');

const QrTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  classId: { type: String, required: true },
  type: { type: String, enum: ['CHECKIN', 'CHECKOUT'], required: true },
  used: { type: Boolean, default: false },
  expiresAt: { type: Date, required: true, index: { expires: 0 } }
});

module.exports = mongoose.model('QrToken', QrTokenSchema);
