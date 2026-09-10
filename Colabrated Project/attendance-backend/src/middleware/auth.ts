import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { User } from '../models/User';
declare global { namespace Express { interface Request { user?: any; } } }
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: { code: 'AUTH_MISSING', message: 'Missing token' } });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
    const user = await User.findById(decoded.userId).select('-passwordHash');
    if (!user || user.status === 'inactive') {
      return res.status(401).json({ success: false, error: { code: 'AUTH_INVALID', message: 'User inactive' } });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: { code: 'AUTH_INVALID_TOKEN', message: 'Invalid token' } });
  }
};
