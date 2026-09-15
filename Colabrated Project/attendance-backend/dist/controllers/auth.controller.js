"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const config_1 = require("../config");
class AuthController {
    static async login(req, res) {
        const { email, password } = req.body;
        const user = await User_1.User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, error: { code: 'AUTH_INVALID_CREDENTIALS', message: 'Invalid credentials' } });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.config.jwtSecret, { expiresIn: config_1.config.jwtExpiresIn });
        res.json({ success: true, data: { token, user: { id: user._id, email: user.email, role: user.role } } });
    }
    static async logout(req, res) {
        res.json({ success: true, data: { message: 'Logged out' } });
    }
}
exports.AuthController = AuthController;
