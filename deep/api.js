// backend/src/routes/api.js
import express from 'express';
import { signalGenerator } from '../server.js';
import { marketEngine } from '../server.js';
import { Signal } from '../models/Signal.js';
import { Market } from '../models/Market.js';
import { authMiddleware } from '../middleware/auth.js';
import { validateSignal } from '../middleware/validation.js';
import { logger } from '../middleware/logger.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // 60 requests per minute
    message: { error: 'Too many requests, please try again later.' }
});

// Apply rate limiting to all routes
router.use(limiter);

// ===== Signal Routes =====

/**
 * GET /api/signal/current
 * Get the latest generated signal
 */
router.get('/signal/current', async (req, res) => {
    try {
        const signal = signalGenerator.getCurrentSignal();
        if (!signal) {
            return res.status(404).json({ error: 'No signal available' });
        }
        res.json(signal);
    } catch (error) {
        logger.error('Error fetching current signal:', error);
        res.status(500).json({ error: 'Failed to fetch current signal' });
    }
});

/**
 * GET /api/signal/history
 * Get signal history with pagination
 */
router.get('/signal/history', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        
        const [signals, total] = await Promise.all([
            Signal.find()
                .sort({ timestamp: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Signal.countDocuments()
        ]);
        
        res.json({
            data: signals,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        logger.error('Error fetching signal history:', error);
        res.status(500).json({ error: 'Failed to fetch signal history' });
    }
});

/**
 * GET /api/signal/stats
 * Get signal statistics
 */
router.get('/signal/stats', async (req, res) => {
    try {
        const stats = signalGenerator.getStats();
        
        // Get additional stats from database
        const [total, last24h, winRate] = await Promise.all([
            Signal.countDocuments(),
            Signal.countDocuments({
                timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
            }),
            Signal.aggregate([
                { $match: { result: { $ne: 'pending' } } },
                { $group: {
                    _id: null,
                    wins: { $sum: { $cond: [{ $eq: ['$result', 'win'] }, 1, 0] } },
                    total: { $sum: 1 }
                }}
            ])
        ]);
        
        const winRateValue = winRate.length > 0 && winRate[0].total > 0
            ? (winRate[0].wins / winRate[0].total * 100)
            : 0;
        
        res.json({
            ...stats,
            totalSignals: total,
            last24h,
            winRate: parseFloat(winRateValue.toFixed(1)),
            uptime: process.uptime()
        });
    } catch (error) {
        logger.error('Error fetching signal stats:', error);
        res.status(500).json({ error: 'Failed to fetch signal stats' });
    }
});

// ===== Market Routes =====

/**
 * GET /api/market/data
 * Get current market data
 */
router.get('/market/data', async (req, res) => {
    try {
        const data = marketEngine.getMarketData();
        res.json({
            timestamp: new Date(),
            data
        });
    } catch (error) {
        logger.error('Error fetching market data:', error);
        res.status(500).json({ error: 'Failed to fetch market data' });
    }
});

/**
 * GET /api/market/history/:asset
 * Get historical market data for an asset
 */
router.get('/market/history/:asset', async (req, res) => {
    try {
        const { asset } = req.params;
        const limit = parseInt(req.query.limit) || 100;
        
        const data = await Market.find({ asset })
            .sort({ timestamp: -1 })
            .limit(limit)
            .lean();
        
        res.json(data.reverse());
    } catch (error) {
        logger.error('Error fetching market history:', error);
        res.status(500).json({ error: 'Failed to fetch market history' });
    }
});

/**
 * GET /api/market/summary
 * Get market summary with indicators
 */
router.get('/market/summary', async (req, res) => {
    try {
        const summary = marketEngine.getMarketSummary();
        res.json(summary);
    } catch (error) {
        logger.error('Error fetching market summary:', error);
        res.status(500).json({ error: 'Failed to fetch market summary' });
    }
});

// ===== System Routes =====

/**
 * GET /api/system/status
 * Get system status
 */
router.get('/system/status', async (req, res) => {
    try {
        const stats = signalGenerator.getStats();
        const marketData = marketEngine.getMarketData();
        
        res.json({
            status: 'online',
            services: {
                signalGenerator: stats.isRunning ? 'active' : 'inactive',
                marketEngine: marketEngine.isRunning ? 'active' : 'inactive',
                database: true,
                telegram: true
            },
            metrics: {
                signalsGenerated: stats.totalSignals || 0,
                activeAssets: Object.keys(marketData).length,
                uptime: process.uptime()
            }
        });
    } catch (error) {
        logger.error('Error fetching system status:', error);
        res.status(500).json({ error: 'Failed to fetch system status' });
    }
});

/**
 * GET /api/system/health
 * Health check endpoint
 */
router.get('/system/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date(),
        uptime: process.uptime()
    });
});

// ===== Admin Routes (Protected) =====

/**
 * POST /api/admin/signal/generate
 * Manually generate a signal (admin only)
 */
router.post('/admin/signal/generate', authMiddleware, async (req, res) => {
    try {
        const signal = await signalGenerator.generateSignal();
        res.json({
            message: 'Signal generated successfully',
            signal
        });
    } catch (error) {
        logger.error('Error generating signal:', error);
        res.status(500).json({ error: 'Failed to generate signal' });
    }
});

/**
 * PUT /api/admin/signal/:id/result
 * Update signal result (admin only)
 */
router.put('/admin/signal/:id/result', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { result, notes } = req.body;
        
        if (!['win', 'loss', 'pending'].includes(result)) {
            return res.status(400).json({ error: 'Invalid result status' });
        }
        
        const signal = await Signal.findByIdAndUpdate(
            id,
            { result, notes },
            { new: true }
        );
        
        if (!signal) {
            return res.status(404).json({ error: 'Signal not found' });
        }
        
        res.json({
            message: 'Signal updated successfully',
            signal
        });
    } catch (error) {
        logger.error('Error updating signal:', error);
        res.status(500).json({ error: 'Failed to update signal' });
    }
});

// ===== WebSocket Route =====

/**
 * GET /api/websocket/info
 * Get WebSocket connection info
 */
router.get('/websocket/info', (req, res) => {
    res.json({
        wsUrl: process.env.WS_URL || `ws://localhost:${process.env.PORT || 5000}`,
        protocols: ['signal', 'market', 'system']
    });
});

export default router;