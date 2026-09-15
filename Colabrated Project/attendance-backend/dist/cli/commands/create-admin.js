"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminCommand = createAdminCommand;
const db_cli_1 = require("../utils/db-cli");
const User_1 = require("../../models/User");
const logger_1 = __importDefault(require("../../config/logger"));
async function createAdminCommand(options) {
    await (0, db_cli_1.withDb)(async () => {
        const { email, password, name } = options;
        const existing = await User_1.User.findOne({ email });
        if (existing) {
            logger_1.default.error(`User with email "${email}" already exists.`);
            process.exit(1);
        }
        const user = new User_1.User({ email, passwordHash: password, name, role: User_1.UserRole.SUPER_ADMIN, status: 'active' });
        await user.save();
        logger_1.default.info(`Super Admin created: ${email} (${name})`);
    });
}
