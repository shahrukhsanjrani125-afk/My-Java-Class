const mongoose = require('mongoose');

const AttendanceLogSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  date: { type: Date, required: true, default: () => new Date().setHours(0,0,0,0) },
  checkInTime: { type: Date },
  checkOutTime: { type: Date },
  status: { type: String, enum: ['PRESENT', 'LATE', 'ABSENT'], default: 'ABSENT' }
});

AttendanceLogSchema.index({ studentId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('AttendanceLog', AttendanceLogSchema);
