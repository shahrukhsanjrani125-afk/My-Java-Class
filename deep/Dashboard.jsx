// frontend/src/components/Dashboard/Dashboard.jsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import SignalCard from './SignalCard';
import MarketGrid from './MarketGrid';
import HistoryList from './HistoryList';
import SystemStatus from './SystemStatus';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const { loading, currentSignal, marketData } = useApp();
    const [activeTab, setActiveTab] = useState('signals');

    if (loading.initial) {
        return <LoadingSpinner />;
    }

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.logo}>
                    <span className={styles.sharkIcon}>🦈</span>
                    <h1>SHARK VIP</h1>
                    <span className={styles.badge}>AUTONOMOUS</span>
                </div>
                <div className={styles.status}>
                    <span className={`${styles.statusDot} ${styles.active}`} />
                    <span className={styles.statusText}>SYSTEM ACTIVE</span>
                </div>
            </header>

            {/* Main Content */}
            <div className={styles.grid}>
                {/* Signal Card */}
                <div className={styles.signalCard}>
                    <SignalCard signal={currentSignal} />
                </div>

                {/* Market Grid */}
                <div className={styles.marketCard}>
                    <MarketGrid data={marketData} />
                </div>

                {/* History List */}
                <div className={styles.historyCard}>
                    <HistoryList />
                </div>

                {/* System Status */}
                <div className={styles.statusCard}>
                    <SystemStatus />
                </div>
            </div>

            {/* Notification Area */}
            <div className={styles.notifications}>
                {/* Notification rendering */}
            </div>
        </div>
    );
};

export default Dashboard;