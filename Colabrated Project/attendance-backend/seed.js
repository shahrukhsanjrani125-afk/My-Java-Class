const Admin = require('./models/Admin');
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();

const seedAdmin = async () => {
  try {
    const admin = new Admin({
      email: 'admin@example.com',
      passwordHash: 'admin123'
    });
    await admin.save();
    console.log('Admin created successfully');
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seedAdmin();
