// frontend/src/context/AppContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';
import { websocketService } from '../services/websocket';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [currentSignal, setCurrentSignal] = useState(null);
    const [signalHistory, setSignalHistory] = useState([]);
    const [marketData, setMarketData] = useState({});
    const [systemStatus, setSystemStatus] = useState({
        generator: { running: false, signalsGenerated: 0 },
        market: { running: false },
        system: { uptime: 0 }
    });
    const [isConnected, setIsConnected] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState({});

    // Initialize WebSocket connections
    useEffect(() => {
        const initWebSocket = async () => {
            try {
                await websocketService.connect();
                setIsConnected(true);
                
                // Subscribe to signal updates
                websocketService.subscribe('signals', (data) => {
                    if (data.type === 'new') {
                        setCurrentSignal(data.data);
                        addNotification({
                            type: 'signal',
                            message: `New ${data.data.asset} signal: ${data.data.direction}`,
                            timestamp: new Date()
                        });
                    }
                });
                
                // Subscribe to market updates
                websocketService.subscribe('market', (data) => {
                    if (data.type === 'update') {
                        setMarketData(data.data);
                    }
                });
                
                // Subscribe to system updates
                websocketService.subscribe('system', (data) => {
                    if (data.type === 'status') {
                        setSystemStatus(data.data);
                    }
                });
            } catch (error) {
                console.error('WebSocket initialization error:', error);
            }
        };
        
        initWebSocket();
        
        return () => {
            websocketService.disconnect();
        };
    }, []);

    // Fetch initial data
    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading({ ...loading, initial: true });
            
            try {
                const [signal, history, market] = await Promise.all([
                    apiService.getCurrentSignal(),
                    apiService.getSignalHistory({ limit: 20 }),
                    apiService.getMarketData()
                ]);
                
                if (signal) setCurrentSignal(signal);
                if (history) setSignalHistory(history);
                if (market) setMarketData(market);
            } catch (error) {
                console.error('Error fetching initial data:', error);
                addNotification({
                    type: 'error',
                    message: 'Failed to fetch initial data',
                    timestamp: new Date()
                });
            } finally {
                setLoading({ ...loading, initial: false });
            }
        };
        
        fetchInitialData();
    }, []);

    const addNotification = (notification) => {
        setNotifications(prev => [...prev, { id: Date.now(), ...notification }]);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== notification.id));
        }, 5000);
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    const refreshSignal = async () => {
        setLoading({ ...loading, refresh: true });
        try {
            const signal = await apiService.getCurrentSignal();
            if (signal) setCurrentSignal(signal);
        } catch (error) {
            console.error('Error refreshing signal:', error);
        } finally {
            setLoading({ ...loading, refresh: false });
        }
    };

    const loadMoreHistory = async (page) => {
        try {
            const data = await apiService.getSignalHistory({ page, limit: 20 });
            setSignalHistory(prev => [...prev, ...data]);
        } catch (error) {
            console.error('Error loading more history:', error);
        }
    };

    const value = {
        currentSignal,
        signalHistory,
        marketData,
        systemStatus,
        isConnected,
        notifications,
        loading,
        refreshSignal,
        loadMoreHistory,
        clearNotifications,
        addNotification
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};