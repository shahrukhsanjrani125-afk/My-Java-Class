// frontend/src/components/Dashboard/SystemStatus.jsx
import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import styles from './SystemStatus.module.css';

const SystemStatus = () => {
    const { systemStatus, isConnected } = useApp();
    const [uptime, setUptime] = useState('00:00:00');

    useEffect(() => {
        const updateUptime = () => {
            if (systemStatus?.system?.uptime) {
                const seconds = Math.floor(systemStatus.system.uptime);
                const hours = Math.floor(seconds / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                const secs = seconds % 60;
                setUptime(
                    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
                );
            }
        };

        updateUptime();
        const interval = setInterval(updateUptime, 1000);
        return () => clearInterval(interval);
    }, [systemStatus]);

    const metrics = [
        {
            label: 'Uptime',
            value: uptime,
            icon: '⏱️'
        },
        {
            label: 'Signals',
            value: systemStatus?.generator?.signalsGenerated || 0,
            icon: '📡'
        },
        {
            label: 'Assets',
            value: Object.keys(systemStatus?.market?.assets || {}).length || 0,
            icon: '💹'
        },
        {
            label: 'Status',
            value: isConnected ? 'Connected' : 'Disconnected',
            icon: '🔌',
            className: isConnected ? styles.active : styles.error
        }
    ];

    return (
        <div className={styles.systemStatus}>
            <div className={styles.header}>
                <h2>⚙️ SYSTEM STATUS</h2>
            </div>
            
            <div className={styles.metrics}>
                {metrics.map((metric) => (
                    <div key={metric.label} className={styles.metric}>
                        <span className={styles.metricIcon}>{metric.icon}</span>
                        <div className={styles.metricContent}>
                            <span className={styles.metricLabel}>{metric.label}</span>
                            <span className={`${styles.metricValue} ${metric.className || ''}`}>
                                {metric.value}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.services}>
                <div className={styles.service}>
                    <span className={styles.serviceLabel}>Signal Generator</span>
                    <span className={`${styles.serviceStatus} ${
                        systemStatus?.generator?.running ? styles.active : styles.inactive
                    }`}>
                        {systemStatus?.generator?.running ? '🟢' : '🔴'}
                    </span>
                </div>
                <div className={styles.service}>
                    <span className={styles.serviceLabel}>Market Engine</span>
                    <span className={`${styles.serviceStatus} ${
                        systemStatus?.market?.running ? styles.active : styles.inactive
                    }`}>
                        {systemStatus?.market?.running ? '🟢' : '🔴'}
                    </span>
                </div>
                <div className={styles.service}>
                    <span className={styles.serviceLabel}>WebSocket</span>
                    <span className={`${styles.serviceStatus} ${
                        isConnected ? styles.active : styles.inactive
                    }`}>
                        {isConnected ? '🟢' : '🔴'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SystemStatus;