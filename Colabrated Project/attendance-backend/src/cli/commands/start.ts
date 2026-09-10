import { Command } from 'commander';
import logger from '../../config/logger';
import { config } from '../../config';
import { connectDB } from '../../utils/db';
export async function startCommand(options: { port?: string }) {
  const port = parseInt(options.port || String(config.port), 10);
  try {
    await connectDB();
    const app = (await import('../../app')).default;
    const server = app.listen(port, () => {
      logger.info(`Server started on port ${port} (${config.env})`);
      logger.info(`Health: http://localhost:${port}/health`);
    });
    const shutdown = () => { server.close(() => { logger.info('Server closed'); process.exit(0); }); };
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
}
