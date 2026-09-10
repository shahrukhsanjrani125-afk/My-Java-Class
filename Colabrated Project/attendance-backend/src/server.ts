import app from './app';
import { connectDB } from './utils/db';
import logger from './config/logger';
import { config } from './config';

const start = async () => {
  await connectDB();
  app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
  });
};

start();
