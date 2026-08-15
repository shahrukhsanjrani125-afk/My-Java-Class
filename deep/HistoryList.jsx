// frontend/src/components/Dashboard/HistoryList.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { apiService } from '../../services/api';
import styles from './HistoryList.module.css';

const HistoryList = () => {
    const { signalHistory, loadMoreHistory } = useApp();
    const [history, setHistory] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef(null);

    useEffect(() => {
        setHistory(signalHistory);
    }, [signalHistory]);

    useEffect(() => {
        // Intersection Observer for infinite scroll
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                loadMore(page + 1);
                setPage(p => p + 1);
            }
        });

        const target = document.querySelector('#historyEnd');
        if (target) {
            observerRef.current.observe(target);
        }

        return () => observerRef.current?.disconnect();
    }, [hasMore, loading, page]);

    if (!history.length) {
        return (
            <div className={styles.historyList}>
                <div className={styles.header}>
                    <h2>📊 SIGNAL HISTORY</h2>
                    <span className={styles.count}>0</span>
                </div>
                <div className={styles.empty}>No signals yet</div>
            </div>
        );
    }

    const getDirectionClass = (direction) => {
        return styles[`direction${direction.charAt(0)}${direction.slice(1).toLowerCase()}`] || '';
    };

    return (
        <div className={styles.historyList}>
            <div className={styles.header}>
                <h2>📊 SIGNAL HISTORY</h2>
                <span className={styles.count}>{history.length}</span>
            </div>
            
            <div className={styles.list}>
                {history.map((signal) => (
                    <div key={signal._id || signal.timestamp} className={styles.historyItem}>
                        <span className={styles.time}>
                            {new Date(signal.timestamp).toLocaleTimeString()}
                        </span>
                        <span className={styles.asset}>{signal.asset}</span>
                        <span className={`${styles.direction} ${getDirectionClass(signal.direction)}`}>
                            {signal.direction}
                        </span>
                        <span className={styles.price}>{signal.entryPrice}</span>
                        <span className={styles.confidence}>{signal.confidence}%</span>
                    </div>
                ))}
                <div id="historyEnd" ref={observerRef} />
                {loading && <div className={styles.loading}>Loading more...</div>}
            </div>
        </div>
    );
};

export default HistoryList;