// frontend/src/components/Dashboard/SignalCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SignalCard.module.css';

const SignalCard = ({ signal }) => {
    if (!signal) {
        return (
            <div className={styles.signalCard}>
                <div className={styles.header}>
                    <h2>📡 CURRENT SIGNAL</h2>
                    <span className={styles.status}>Waiting...</span>
                </div>
                <div className={styles.placeholder}>
                    <span className={styles.loading}>⏳</span>
                    <span>No signal available</span>
                </div>
            </div>
        );
    }

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString();
    };

    const getDirectionColor = (direction) => {
        const colors = {
            'CALL': '#00ff88',
            'PUT': '#ff4444',
            'BUY': '#ffcc00',
            'SELL': '#ff6600'
        };
        return colors[direction] || '#ffffff';
    };

    const getConfidenceColor = (confidence) => {
        if (confidence >= 80) return '#00ff88';
        if (confidence >= 60) return '#ffcc00';
        return '#ff4444';
    };

    return (
        <div className={styles.signalCard}>
            <div className={styles.header}>
                <h2>📡 CURRENT SIGNAL</h2>
                <span className={styles.time}>{formatTime(signal.timestamp)}</span>
            </div>
            
            <div className={styles.content}>
                <div className={styles.assetRow}>
                    <span className={styles.asset}>{signal.asset}</span>
                    <span 
                        className={styles.direction}
                        style={{ color: getDirectionColor(signal.direction) }}
                    >
                        {signal.direction}
                    </span>
                </div>
                
                <div className={styles.details}>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Type</span>
                        <span className={styles.value}>{signal.signalType}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Entry</span>
                        <span className={styles.value}>{signal.entryPrice}</span>
                    </div>
                    {signal.duration && (
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Duration</span>
                            <span className={styles.value}>{signal.duration}s</span>
                        </div>
                    )}
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Confidence</span>
                        <span 
                            className={styles.value}
                            style={{ color: getConfidenceColor(signal.confidence) }}
                        >
                            {signal.confidence}%
                        </span>
                    </div>
                    {signal.stopLoss && (
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Stop Loss</span>
                            <span className={styles.value}>{signal.stopLoss}</span>
                        </div>
                    )}
                    {signal.takeProfit && (
                        <div className={styles.detailItem}>
                            <span className={styles.label}>Take Profit</span>
                            <span className={styles.value}>{signal.takeProfit}</span>
                        </div>
                    )}
                </div>

                {signal.metadata?.technicalIndicators && (
                    <div className={styles.indicators}>
                        <div className={styles.indicatorItem}>
                            <span className={styles.indicatorLabel}>RSI</span>
                            <span className={styles.indicatorValue}>
                                {signal.metadata.technicalIndicators.rsi}
                            </span>
                        </div>
                        <div className={styles.indicatorItem}>
                            <span className={styles.indicatorLabel}>MACD</span>
                            <span className={styles.indicatorValue}>
                                {signal.metadata.technicalIndicators.macd}
                            </span>
                        </div>
                    </div>
                )}

                <div className={styles.strategy}>
                    <span className={styles.strategyLabel}>Strategy</span>
                    <span className={styles.strategyValue}>{signal.strategy}</span>
                </div>
            </div>
        </div>
    );
};

SignalCard.propTypes = {
    signal: PropTypes.shape({
        _id: PropTypes.string,
        asset: PropTypes.string,
        direction: PropTypes.string,
        signalType: PropTypes.string,
        entryPrice: PropTypes.number,
        timestamp: PropTypes.string,
        duration: PropTypes.number,
        stopLoss: PropTypes.number,
        takeProfit: PropTypes.number,
        confidence: PropTypes.number,
        strategy: PropTypes.string,
        metadata: PropTypes.object
    })
};

export default SignalCard;