"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./utils/db");
const logger_1 = __importDefault(require("./config/logger"));
const config_1 = require("./config");
const start = async () => {
    await (0, db_1.connectDB)();
    app_1.default.listen(config_1.config.port, () => {
        logger_1.default.info(`Server running on port ${config_1.config.port}`);
    });
};
start();
