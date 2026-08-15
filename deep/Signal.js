// backend/src/models/Signal.js
import mongoose from 'mongoose';

const SignalSchema = new mongoose.Schema({
    asset: {
        type: String,
        required: true,
        enum: ['EURUSD', 'GBPUSD', 'USDJPY', 'BTCUSD', 'ETHUSD', 'XAUUSD', 'USDCAD', 'EURGBP']
    },
    direction: {
        type: String,
        required: true,
        enum: ['CALL', 'PUT', 'BUY', 'SELL']
    },
    signalType: {
        type: String,
        required: true,
        enum: ['binary', 'forex', 'crypto']
    },
    entryPrice: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number,
        default: null
    },
    lotSize: {
        type: Number,
        default: null
    },
    stopLoss: {
        type: Number,
        default: null
    },
    takeProfit: {
        type: Number,
        default: null
    },
    confidence: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    strategy: {
        type: String,
        enum: ['VIP', 'PRO', 'MAX'],
        default: 'VIP'
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'closed', 'cancelled'],
        default: 'pending'
    },
    result: {
        type: String,
        enum: ['win', 'loss', 'pending'],
        default: 'pending'
    },
    notes: {
        type: String,
        default: ''
    },
    metadata: {
        technicalIndicators: {
            rsi: Number,
            macd: Number,
            bollinger: {
                upper: Number,
                middle: Number,
                lower: Number
            }
        },
        marketContext: {
            volume: Number,
            change24h: Number
        }
    },
    dispatched: {
        toTelegram: {
            type: Boolean,
            default: false
        },
        toWebhook: {
            type: Boolean,
            default: false
        }
    }
}, {
    timestamps: true
});

// Indexes for performance
SignalSchema.index({ asset: 1, timestamp: -1 });
SignalSchema.index({ status: 1 });
SignalSchema.index({ timestamp: -1 });

// Virtual for formatted display
SignalSchema.virtual('formattedDisplay').get(function() {
    return `${this.asset} ${this.direction} - ${this.confidence}%`;
});

// Method to check if signal is expired
SignalSchema.methods.isExpired = function() {
    if (!this.duration) return false;
    const elapsed = Date.now() - this.timestamp.getTime();
    return elapsed > this.duration * 1000;
};

export const Signal = mongoose.model('Signal', SignalSchema);