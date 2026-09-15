"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_1 = require("../config");
const rateLimiter = (key) => {
    const opts = config_1.config.rateLimits[key];
    if (!opts)
        throw new Error(`Rate limit config for "${key}" not found`);
    return (0, express_rate_limit_1.default)({
        windowMs: opts.windowMs,
        max: opts.max,
        standardHeaders: true,
        legacyHeaders: false,
        message: { success: false, error: { code: 'RATE_LIMITED', message: 'Too many requests' } }
    });
};
exports.rateLimiter = rateLimiter;
