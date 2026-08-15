// backend/src/middleware/auth.js
import jwt from 'jsonwebtoken';
import { logger } from './logger.js';

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'shark-vip-secret');
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        logger.error('Auth error:', error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};