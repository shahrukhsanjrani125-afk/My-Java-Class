// backend/src/server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { connectDB } from './config/database.js';
import { initializeTelegram } from './config/telegram.js';
import { setupTOR } from './config/tor.js';
import apiRoutes from './routes/api.js';
import { setupWebSocket } from './routes/websocket.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { SignalGenerator } from './services/signalGenerator.js';
import { MarketEngine } from './services/marketEngine.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: logger.stream }));

// Initialize services
let signalGenerator;
let marketEngine;
let telegramBot;
let torService;

// Start services
async function initializeServices() {
    try {
        // Connect to MongoDB
        await connectDB();
        logger.info('✅ Database connected');

        // Initialize TOR
        torService = await setupTOR();
        logger.info('✅ TOR service initialized');

        // Initialize Telegram
        telegramBot = await initializeTelegram();
        logger.info('✅ Telegram bot initialized');

        // Initialize Market Engine
        marketEngine = new MarketEngine({
            assets: ['EURUSD', 'GBPUSD', 'USDJPY', 'BTCUSD', 'ETHUSD'],
            volatility: 0.02
        });
        logger.info('✅ Market engine initialized');

        // Initialize Signal Generator
        signalGenerator = new SignalGenerator({
            interval: 180, // 3 minutes
            assets: ['EURUSD', 'GBPUSD', 'USDJPY', 'BTCUSD', 'ETHUSD', 'XAUUSD']
        });
        
        // Register signal callback
        signalGenerator.onSignal(async (signal) => {
            // Broadcast to all connected clients
            io.emit('new_signal', signal);
            
            // Send to Telegram
            if (telegramBot) {
                try {
                    await telegramBot.sendSignal(signal);
                } catch (error) {
                    logger.error('Telegram send error:', error);
                }
            }
            
            // Save to database
            try {
                await signalGenerator.saveSignal(signal);
            } catch (error) {
                logger.error('Database save error:', error);
            }
        });

        // Start signal generation
        await signalGenerator.start();
        logger.info('✅ Signal generator started');

        logger.info('🚀 All services initialized successfully');
    } catch (error) {
        logger.error('Failed to initialize services:', error);
        process.exit(1);
    }
}

// Setup routes
app.use('/api', apiRoutes);

// WebSocket setup
setupWebSocket(io);

// Error handling
app.use(errorHandler);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        services: {
            database: 'connected',
            telegram: telegramBot ? 'active' : 'inactive',
            tor: torService ? 'active' : 'inactive',
            signalGenerator: signalGenerator ? 'active' : 'inactive',
            marketEngine: marketEngine ? 'active' : 'inactive'
        },
        uptime: process.uptime()
    });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
    logger.info(`🦈 SHARK VIP Server running on port ${PORT}`);
    await initializeServices();
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    logger.info('SIGTERM received, shutting down gracefully...');
    
    if (signalGenerator) {
        await signalGenerator.stop();
    }
    
    if (telegramBot) {
        await telegramBot.stop();
    }
    
    if (torService) {
        await torService.stop();
    }
    
    await mongoose.disconnect();
    server.close(() => {
        logger.info('Server shutdown complete');
        process.exit(0);
    });
});

export { signalGenerator, marketEngine, telegramBot, torService };