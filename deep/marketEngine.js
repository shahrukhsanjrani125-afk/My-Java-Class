// backend/src/services/marketEngine.js
import { Market } from '../models/Market.js';
import { logger } from '../middleware/logger.js';
import { EventEmitter } from 'events';

class MarketEngine extends EventEmitter {
    constructor(config = {}) {
        super();
        this.config = {
            assets: config.assets || ['EURUSD', 'GBPUSD', 'USDJPY', 'BTCUSD'],
            volatility: config.volatility || 0.02,
            updateInterval: config.updateInterval || 5000, // 5 seconds
            ...config
        };
        
        this.marketData = {};
        this.trend = 0;
        this.isRunning = false;
        this.intervalId = null;
        
        // Initialize market data
        this.config.assets.forEach(asset => {
            this.marketData[asset] = {
                price: 1 + Math.random() * 100,
                volume: 1000 + Math.random() * 9000,
                change24h: 0,
                high: 0,
                low: Infinity,
                bid: 0,
                ask: 0,
                spread: 0,
                timestamp: new Date()
            };
        });
        
        logger.info('Market engine initialized');
    }

    async start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        
        // Initial data generation
        await this.updateMarket();
        
        // Start periodic updates
        this.intervalId = setInterval(async () => {
            await this.updateMarket();
        }, this.config.updateInterval);
        
        logger.info('Market engine started');
        return this;
    }

    async stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning = false;
        logger.info('Market engine stopped');
    }

    async updateMarket() {
        try {
            const updates = [];
            
            for (const [asset, data] of Object.entries(this.marketData)) {
                // Random walk with drift
                const change = this.generatePriceChange(data.price);
                const newPrice = data.price * (1 + change);
                
                // Update data
                data.price = this.roundPrice(newPrice);
                data.volume = this.updateVolume(data.volume);
                data.change24h = this.roundPrice((newPrice - data.price) / data.price * 100, 2);
                data.high = Math.max(data.high, newPrice);
                data.low = Math.min(data.low, newPrice);
                data.bid = this.roundPrice(newPrice * (1 - 0.0001));
                data.ask = this.roundPrice(newPrice * (1 + 0.0001));
                data.spread = this.roundPrice((data.ask - data.bid) * 10000);
                data.timestamp = new Date();
                
                // Save to database
                const marketDoc = new Market({
                    asset,
                    price: data.price,
                    volume: data.volume,
                    change24h: data.change24h,
                    high: data.high,
                    low: data.low,
                    timestamp: data.timestamp,
                    metadata: {
                        spread: data.spread,
                        bid: data.bid,
                        ask: data.ask
                    }
                });
                
                updates.push(marketDoc.save());
            }
            
            // Wait for all saves to complete
            await Promise.all(updates);
            
            // Emit update event
            this.emit('marketUpdate', this.marketData);
            
        } catch (error) {
            logger.error('Market update failed:', error);
        }
    }

    generatePriceChange(currentPrice) {
        // Generate realistic market movement
        const noise = (Math.random() - 0.5) * this.config.volatility;
        const drift = this.trend * 0.0001;
        const random = (Math.random() - 0.5) * 0.001;
        
        // Mean reversion
        const mean = 100; // Long-term mean
        const reversion = (mean - currentPrice) / 10000;
        
        return noise + drift + random + reversion;
    }

    updateVolume(currentVolume) {
        // Volume with random variation
        const change = (Math.random() - 0.5) * 0.2;
        let newVolume = currentVolume * (1 + change);
        newVolume = Math.max(100, Math.min(10000, newVolume));
        return Math.round(newVolume);
    }

    roundPrice(value, decimals = 4) {
        return parseFloat(value.toFixed(decimals));
    }

    getMarketData(assets = null) {
        const targetAssets = assets || this.config.assets;
        const result = {};
        
        for (const asset of targetAssets) {
            if (this.marketData[asset]) {
                result[asset] = { ...this.marketData[asset] };
            }
        }
        
        return result;
    }

    getAssetPrice(asset) {
        return this.marketData[asset]?.price || 0;
    }

    async getHistoricalData(asset, limit = 100) {
        const data = await Market.find({ asset })
            .sort({ timestamp: -1 })
            .limit(limit)
            .lean();
        
        return data.reverse();
    }

    // Market indicators
    calculateVolatility(asset, period = 20) {
        return this.config.volatility + (Math.random() - 0.5) * 0.005;
    }

    calculateVolumeWeightedAverage(asset, period = 20) {
        // Simplified VWAP calculation
        return this.getAssetPrice(asset) * (1 + (Math.random() - 0.5) * 0.001);
    }

    detectTrend(asset) {
        // Simple trend detection
        const price = this.getAssetPrice(asset);
        const historical = this.marketData[asset]?.price || price;
        
        if (price > historical * 1.001) return 'uptrend';
        if (price < historical * 0.999) return 'downtrend';
        return 'sideways';
    }

    getMarketSummary() {
        const summary = {
            timestamp: new Date(),
            assets: {},
            indicators: {
                volatility: 'medium',
                momentum: 'neutral',
                sentiment: 'cautious'
            }
        };
        
        for (const [asset, data] of Object.entries(this.marketData)) {
            summary.assets[asset] = {
                price: data.price,
                change24h: data.change24h,
                trend: this.detectTrend(asset),
                volume: data.volume,
                spread: data.spread
            };
        }
        
        return summary;
    }
}

// Singleton instance
const marketEngineInstance = new MarketEngine();
export { marketEngineInstance as marketEngine };