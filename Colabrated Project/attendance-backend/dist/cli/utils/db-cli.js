"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectCliDb = connectCliDb;
exports.disconnectCliDb = disconnectCliDb;
exports.withDb = withDb;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../../config");
const logger_1 = __importDefault(require("../../config/logger"));
async function connectCliDb() {
    if (mongoose_1.default.connection.readyState === 1)
        return mongoose_1.default.connection;
    try {
        await mongoose_1.default.connect(config_1.config.mongoUri);
        logger_1.default.info('[CLI] MongoDB connected');
        return mongoose_1.default.connection;
    }
    catch (err) {
        logger_1.default.error('[CLI] MongoDB connection error:', err);
        process.exit(1);
    }
}
async function disconnectCliDb() {
    if (mongoose_1.default.connection.readyState === 1) {
        await mongoose_1.default.disconnect();
        logger_1.default.info('[CLI] MongoDB disconnected');
    }
}
async function withDb(fn) {
    await connectCliDb();
    try {
        return await fn();
    }
    finally {
        await disconnectCliDb();
    }
}
