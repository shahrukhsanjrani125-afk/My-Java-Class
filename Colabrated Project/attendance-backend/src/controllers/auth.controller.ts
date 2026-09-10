import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { config } from '../config';
export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, error: { code: 'AUTH_INVALID_CREDENTIALS', message: 'Invalid credentials' } });
    }
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
    res.json({ success: true, data: { token, user: { id: user._id, email: user.email, role: user.role } } });
  }
  static async logout(req: Request, res: Response) {
    res.json({ success: true, data: { message: 'Logged out' } });
  }
}
