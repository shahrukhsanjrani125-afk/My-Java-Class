import mongoose from 'mongoose';
import { config } from '../../config';
import logger from '../../config/logger';
export async function connectCliDb() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  try {
    await mongoose.connect(config.mongoUri);
    logger.info('[CLI] MongoDB connected');
    return mongoose.connection;
  } catch (err) {
    logger.error('[CLI] MongoDB connection error:', err);
    process.exit(1);
  }
}
export async function disconnectCliDb() {
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
    logger.info('[CLI] MongoDB disconnected');
  }
}
export async function withDb<T>(fn: () => Promise<T>): Promise<T> {
  await connectCliDb();
  try { return await fn(); } finally { await disconnectCliDb(); }
}
