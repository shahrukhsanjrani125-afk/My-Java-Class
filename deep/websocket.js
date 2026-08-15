// backend/src/routes/websocket.js
import { logger } from '../middleware/logger.js';
import { signalGenerator } from '../server.js';
import { marketEngine } from '../server.js';
import { Signal } from '../models/Signal.js';

export const setupWebSocket = (io) => {
    // Namespace for signals
    const signalNamespace = io.of('/signals');
    
    signalNamespace.on('connection', (socket) => {
        logger.info(`Signal WebSocket client connected: ${socket.id}`);
        
        // Send current signal immediately
        const currentSignal = signalGenerator.getCurrentSignal();
        if (currentSignal) {
            socket.emit('current', currentSignal);
        }
        
        // Send recent history
        const history = signalGenerator.getHistory(10);
        if (history.length > 0) {
            socket.emit('history', history);
        }
        
        // Handle signal subscription
        socket.on('subscribe', (filters = {}) => {
            socket.filters = filters;
            logger.info(`Client ${socket.id} subscribed to signals with filters:`, filters);
        });
        
        // Handle request for more history
        socket.on('requestHistory', async ({ limit = 20, offset = 0 }) => {
            try {
                const signals = await Signal.find()
                    .sort({ timestamp: -1 })
                    .skip(offset)
                    .limit(limit)
                    .lean();
                    
                socket.emit('historyData', signals);
            } catch (error) {
                logger.error('Error fetching history:', error);
                socket.emit('error', { message: 'Failed to fetch history' });
            }
        });
        
        // Handle disconnection
        socket.on('disconnect', () => {
            logger.info(`Signal WebSocket client disconnected: ${socket.id}`);
        });
    });
    
    // Namespace for market data
    const marketNamespace = io.of('/market');
    
    marketNamespace.on('connection', (socket) => {
        logger.info(`Market WebSocket client connected: ${socket.id}`);
        
        // Send initial market data
        const marketData = marketEngine.getMarketData();
        socket.emit('data', {
            timestamp: new Date(),
            data: marketData
        });
        
        // Handle market data subscription
        socket.on('subscribe', (assets = null) => {
            socket.assets = assets;
            logger.info(`Client ${socket.id} subscribed to market data for:`, assets);
        });
        
        // Handle disconnection
        socket.on('disconnect', () => {
            logger.info(`Market WebSocket client disconnected: ${socket.id}`);
        });
    });
    
    // Broadcast new signals to all connected clients
    signalGenerator.on('signal', (signal) => {
        signalNamespace.emit('new', signal);
    });
    
    // Broadcast market updates
    marketEngine.on('marketUpdate', (marketData) => {
        marketNamespace.emit('update', {
            timestamp: new Date(),
            data: marketData
        });
    });
    
    // System status namespace
    const systemNamespace = io.of('/system');
    
    systemNamespace.on('connection', (socket) => {
        logger.info(`System WebSocket client connected: ${socket.id}`);
        
        // Send initial status
        sendSystemStatus(socket);
        
        // Set up periodic status updates
        const statusInterval = setInterval(() => {
            sendSystemStatus(socket);
        }, 30000); // Every 30 seconds
        
        socket.on('disconnect', () => {
            clearInterval(statusInterval);
            logger.info(`System WebSocket client disconnected: ${socket.id}`);
        });
    });
    
    const sendSystemStatus = async (socket) => {
        try {
            const stats = signalGenerator.getStats();
            const marketData = marketEngine.getMarketData();
            
            const status = {
                timestamp: new Date(),
                generator: {
                    running: stats.isRunning,
                    signalsGenerated: stats.totalSignals || 0,
                    lastSignal: stats.lastSignal
                },
                market: {
                    running: marketEngine.isRunning,
                    assets: Object.keys(marketData).length,
                    lastUpdate: marketEngine.marketData[Object.keys(marketData)[0]]?.timestamp
                },
                system: {
                    uptime: process.uptime(),
                    memory: process.memoryUsage(),
                    cpu: process.cpuUsage()
                }
            };
            
            socket.emit('status', status);
        } catch (error) {
            logger.error('Error sending system status:', error);
        }
    };
    
    logger.info('WebSocket routes initialized');
};