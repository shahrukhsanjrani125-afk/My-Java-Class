import { Command } from 'commander';
import { withDb } from '../utils/db-cli';
import logger from '../../config/logger';
export async function migrateCommand() {
  await withDb(async () => {
    logger.info('Running migrations... (placeholder)');
    logger.info('No pending migrations.');
  });
}
