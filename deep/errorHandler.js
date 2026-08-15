// backend/src/middleware/errorHandler.js
import { logger } from './logger.js';

export const errorHandler = (err, req, res, next) => {
    logger.error('Error:', err);
    
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation Error',
            details: Object.values(err.errors).map(e => e.message)
        });
    }
    
    // Mongoose duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({
            error: 'Duplicate Entry',
            field: Object.keys(err.keyPattern)[0]
        });
    }
    
    // JWT error
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Invalid Token'
        });
    }
    
    // Default error
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};