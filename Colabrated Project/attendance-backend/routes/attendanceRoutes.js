const express = require('express');
const {
  generateCheckInQR,
  generateCheckOutQR,
  scanCheckIn,
  scanCheckOut,
  getAttendanceLogs,
  getStudentAttendance
} = require('../controllers/attendanceController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const router = express.Router();

router.post('/qr/checkin', auth, role('INSTRUCTOR', 'ADMIN'), generateCheckInQR);
router.post('/qr/checkout', auth, role('INSTRUCTOR', 'ADMIN'), generateCheckOutQR);

router.post('/scan/checkin', auth, role('STUDENT', 'INSTRUCTOR', 'ADMIN'), scanCheckIn);
router.post('/scan/checkout', auth, role('STUDENT', 'INSTRUCTOR', 'ADMIN'), scanCheckOut);

router.get('/', auth, role('ADMIN', 'INSTRUCTOR'), getAttendanceLogs);
router.get('/:studentId', auth, role('ADMIN', 'INSTRUCTOR'), getStudentAttendance);

module.exports = router;
