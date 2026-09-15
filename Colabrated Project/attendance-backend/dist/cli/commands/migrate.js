"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateCommand = migrateCommand;
const db_cli_1 = require("../utils/db-cli");
const logger_1 = __importDefault(require("../../config/logger"));
async function migrateCommand() {
    await (0, db_cli_1.withDb)(async () => {
        logger_1.default.info('Running migrations... (placeholder)');
        logger_1.default.info('No pending migrations.');
    });
}
