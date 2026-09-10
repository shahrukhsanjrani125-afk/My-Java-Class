import { Command } from 'commander';
import { withDb } from '../utils/db-cli';
import { User, UserRole } from '../../models/User';
import logger from '../../config/logger';
export async function createAdminCommand(options: { email: string; password: string; name: string }) {
  await withDb(async () => {
    const { email, password, name } = options;
    const existing = await User.findOne({ email });
    if (existing) {
      logger.error(`User with email "${email}" already exists.`);
      process.exit(1);
    }
    const user = new User({ email, passwordHash: password, name, role: UserRole.SUPER_ADMIN, status: 'active' });
    await user.save();
    logger.info(`Super Admin created: ${email} (${name})`);
  });
}
