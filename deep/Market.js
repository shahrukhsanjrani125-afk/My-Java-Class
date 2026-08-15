// backend/src/models/Market.js
import mongoose from 'mongoose';

const MarketSchema = new mongoose.Schema({
    asset: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        default: 0
    },
    change24h: {
        type: Number,
        default: 0
    },
    high: {
        type: Number,
        default: 0
    },
    low: {
        type: Number,
        default: 0
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    },
    metadata: {
        spread: Number,
        openInterest: Number,
        fundingRate: Number
    }
}, {
    timestamps: true
});

// Compound index for efficient queries
MarketSchema.index({ asset: 1, timestamp: -1 });

// Static method to get latest prices
MarketSchema.statics.getLatest = async function(assets) {
    const pipeline = [
        { $match: { asset: { $in: assets } } },
        { $sort: { timestamp: -1 } },
        { $group: {
            _id: '$asset',
            price: { $first: '$price' },
            volume: { $first: '$volume' },
            change24h: { $first: '$change24h' },
            high: { $first: '$high' },
            low: { $first: '$low' },
            timestamp: { $first: '$timestamp' }
        }}
    ];
    
    return this.aggregate(pipeline);
};

export const Market = mongoose.model('Market', MarketSchema);