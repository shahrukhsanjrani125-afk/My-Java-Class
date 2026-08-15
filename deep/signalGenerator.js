// backend/src/services/signalGenerator.js
import { EventEmitter } from 'events';
import { Signal } from '../models/Signal.js';
import { logger } from '../middleware/logger.js';
import { marketEngine } from './marketEngine.js';

class SignalGenerator extends EventEmitter {
    constructor(config = {}) {
        super();
        this.config = {
            interval: config.interval || 180, // seconds
            assets: config.assets || ['EURUSD', 'GBPUSD', 'BTCUSD'],
            ...config
        };
        this.isRunning = false;
        this.intervalId = null;
        this.signalCount = 0;
        this.lastSignal = null;
        this.history = [];
    }

    async start() {
        if (this.isRunning) {
            logger.warn('Signal generator already running');
            return;
        }

        this.isRunning = true;
        logger.info('Signal generator started');
        
        // Generate first signal immediately
        await this.generateSignal();
        
        // Schedule subsequent signals
        this.intervalId = setInterval(async () => {
            await this.generateSignal();
        }, this.config.interval * 1000);
    }

    async stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning = false;
        logger.info('Signal generator stopped');
    }

    async generateSignal() {
        try {
            // Get market data
            const marketData = await marketEngine.getMarketData(this.config.assets);
            
            // Generate signal based on market data
            const signalData = this.analyzeMarket(marketData);
            
            // Create and save signal
            const signal = new Signal(signalData);
            await signal.save();
            
            // Update state
            this.lastSignal = signal;
            this.signalCount++;
            this.history.push(signal);
            
            // Keep history manageable
            if (this.history.length > 1000) {
                this.history = this.history.slice(-1000);
            }
            
            // Emit event
            this.emit('signal', signal);
            logger.info(`Signal generated: ${signal.asset} ${signal.direction}`);
            
            return signal;
        } catch (error) {
            logger.error('Signal generation failed:', error);
            throw error;
        }
    }

    analyzeMarket(marketData) {
        // Random selection for demo - in production this would use real analysis
        const asset = this.randomChoice(this.config.assets);
        const direction = this.randomChoice(['CALL', 'PUT', 'BUY', 'SELL']);
        const signalType = this.randomChoice(['binary', 'forex', 'crypto']);
        
        // Generate realistic price
        const basePrice = this.getAssetPrice(marketData, asset);
        const entryPrice = this.roundPrice(basePrice + (Math.random() - 0.5) * 0.5);
        
        const signal = {
            asset,
            direction,
            signalType,
            entryPrice,
            confidence: this.roundPrice(65 + Math.random() * 30, 1),
            strategy: this.randomChoice(['VIP', 'PRO', 'MAX'])
        };

        // Add type-specific fields
        if (signalType === 'binary') {
            signal.duration = this.randomChoice([30, 60, 120, 180]);
        } else {
            signal.lotSize = this.roundPrice(0.01 + Math.random() * 0.99, 2);
            signal.stopLoss = this.roundPrice(entryPrice * (1 - (0.01 + Math.random() * 0.02)));
            signal.takeProfit = this.roundPrice(entryPrice * (1 + (0.01 + Math.random() * 0.02)));
        }

        // Add technical indicators
        signal.metadata = {
            technicalIndicators: {
                rsi: this.roundPrice(30 + Math.random() * 40),
                macd: this.roundPrice((Math.random() - 0.5) * 2),
                bollinger: {
                    upper: this.roundPrice(entryPrice * 1.02),
                    middle: this.roundPrice(entryPrice),
                    lower: this.roundPrice(entryPrice * 0.98)
                }
            }
        };

        return signal;
    }

    getAssetPrice(marketData, asset) {
        if (marketData[asset]) {
            return marketData[asset].price;
        }
        return 1 + Math.random() * 100;
    }

    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    roundPrice(value, decimals = 4) {
        return parseFloat(value.toFixed(decimals));
    }

    getCurrentSignal() {
        return this.lastSignal;
    }

    getHistory(limit = 20) {
        return this.history.slice(-limit);
    }

    getStats() {
        return {
            totalSignals: this.signalCount,
            isRunning: this.isRunning,
            lastSignal: this.lastSignal ? this.lastSignal.timestamp : null,
            assets: this.config.assets
        };
    }

    async saveSignal(signal) {
        // Already saved in generateSignal
        return signal;
    }

    // Signal analysis methods
    calculateRSI(prices, period = 14) {
        if (prices.length < period + 1) return 50;
        
        let gains = 0;
        let losses = 0;
        
        for (let i = 1; i <= period; i++) {
            const change = prices[prices.length - i] - prices[prices.length - i - 1];
            if (change > 0) gains += change;
            else losses -= change;
        }
        
        const avgGain = gains / period;
        const avgLoss = losses / period;
        
        if (avgLoss === 0) return 100;
        const rs = avgGain / avgLoss;
        return 100 - (100 / (1 + rs));
    }

    calculateMACD(prices) {
        if (prices.length < 26) return 0;
        
        const ema12 = this.calculateEMA(prices, 12);
        const ema26 = this.calculateEMA(prices, 26);
        return ema12 - ema26;
    }

    calculateEMA(prices, period) {
        const multiplier = 2 / (period + 1);
        let ema = prices[0];
        
        for (let i = 1; i < prices.length && i < period; i++) {
            ema = (prices[i] - ema) * multiplier + ema;
        }
        
        return ema;
    }
}

export { SignalGenerator };