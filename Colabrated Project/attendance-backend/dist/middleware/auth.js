"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const User_1 = require("../models/User");
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, error: { code: 'AUTH_MISSING', message: 'Missing token' } });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
        const user = await User_1.User.findById(decoded.userId).select('-passwordHash');
        if (!user || user.status === 'inactive') {
            return res.status(401).json({ success: false, error: { code: 'AUTH_INVALID', message: 'User inactive' } });
        }
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ success: false, error: { code: 'AUTH_INVALID_TOKEN', message: 'Invalid token' } });
    }
};
exports.authMiddleware = authMiddleware;
