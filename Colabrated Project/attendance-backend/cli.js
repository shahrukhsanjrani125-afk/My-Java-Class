const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const BASE_URL = 'http://localhost:5000/api';
let token = null;

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  console.log('Attendance System CLI Client');
  console.log('Commands: login, logout, students, create-student, get-student, update-student, delete-student, qr-checkin, qr-checkout, scan-checkin, scan-checkout, logs, logs-student');
  while (true) {
    const command = await ask('> ');
    const parts = command.trim().split(/\s+/);
    const cmd = parts[0];
    try {
      switch (cmd) {
        case 'login': {
          const email = await ask('Email: ');
          const password = await ask('Password: ');
          const res = await axios.post(`${BASE_URL}/admin/login`, { email, password });
          token = res.data.token;
          console.log('Logged in as', res.data.role);
          break;
        }
        case 'logout': {
          token = null;
          console.log('Logged out');
          break;
        }
        case 'students': {
          if (!token) { console.log('Please login first'); break; }
          const res = await axios.get(`${BASE_URL}/students`, { headers: { Authorization: `Bearer ${token}` } });
          console.log(res.data);
          break;
        }
        case 'create-student': {
          if (!token) { console.log('Please login first'); break; }
          const studentId = await ask('Student ID: ');
          const fullName = await ask('Full Name: ');
          const email = await ask('Email: ');
          const classId = await ask('Class ID: ');
          const res = await axios.post(`${BASE_URL}/students`, { studentId, fullName, email, classId }, { headers: { Authorization: `Bearer ${token}` } });
          console.log(res.data);
          break;
        }
        case 'qr-checkin': {
          if (!token) { console.log('Please login first'); break; }
          const classId = await ask('Class ID: ');
          const res = await axios.post(`${BASE_URL}/attendance/qr/checkin`, { classId }, { headers: { Authorization: `Bearer ${token}` } });
          console.log('QR Image (data URL):', res.data.qrImage.substring(0, 50) + '...');
          console.log('Payload:', res.data.payload);
          break;
        }
        case 'scan-checkin': {
          if (!token) { console.log('Please login first'); break; }
          const qrPayload = await ask('QR Payload: ');
          const studentId = await ask('Student ID: ');
          const res = await axios.post(`${BASE_URL}/attendance/scan/checkin`, { qrPayload, studentId }, { headers: { Authorization: `Bearer ${token}` } });
          console.log(res.data);
          break;
        }
        default:
          console.log('Unknown command');
      }
    } catch (e) {
      console.error(e.response?.data?.message || e.message);
    }
  }
}

main().catch(console.error);