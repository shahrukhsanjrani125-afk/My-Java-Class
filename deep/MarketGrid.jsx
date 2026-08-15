// frontend/src/components/Dashboard/MarketGrid.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useApp } from '../../context/AppContext';
import styles from './MarketGrid.module.css';

const MarketGrid = ({ data }) => {
    const { marketData } = useApp();
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        if (marketData && marketData.data) {
            const assetList = Object.entries(marketData.data).map(([symbol, info]) => ({
                symbol,
                ...info
            }));
            setAssets(assetList);
        }
    }, [marketData]);

    if (!assets.length) {
        return (
            <div className={styles.marketGrid}>
                <div className={styles.header}>
                    <h2>🌐 MARKET DATA</h2>
                </div>
                <div className={styles.placeholder}>Loading market data...</div>
            </div>
        );
    }

    return (
        <div className={styles.marketGrid}>
            <div className={styles.header}>
                <h2>🌐 MARKET DATA</h2>
                <span className={styles.updateTime}>
                    Updated: {new Date().toLocaleTimeString()}
                </span>
            </div>
            
            <div className={styles.grid}>
                {assets.map((asset) => (
                    <div key={asset.symbol} className={styles.marketItem}>
                        <span className={styles.symbol}>{asset.symbol}</span>
                        <span className={styles.price}>
                            {asset.price.toFixed(4)}
                        </span>
                        <span 
                            className={`${styles.change} ${
                                asset.change24h >= 0 ? styles.up : styles.down
                            }`}
                        >
                            {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

MarketGrid.propTypes = {
    data: PropTypes.object
};

export default MarketGrid;