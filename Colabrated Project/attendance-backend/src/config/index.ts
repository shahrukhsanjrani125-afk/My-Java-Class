import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/attendance',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  qrTokenTtl: parseInt(process.env.QR_TOKEN_TTL || '20', 10),
  allowedClassroomSubnets: (process.env.ALLOWED_SUBNETS || '').split(',').filter(Boolean),
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:3000').split(','),
  env: process.env.NODE_ENV || 'development',
  rateLimits: {
    login: { windowMs: 15 * 60 * 1000, max: 5 },
    scan: { windowMs: 60 * 1000, max: 10 },
    registration: { windowMs: 60 * 1000, max: 3 }
  }
};
