// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Dashboard from './components/Dashboard/Dashboard';
import Terminal from './components/Terminal/Terminal';
import { ErrorBoundary } from './components/Common/ErrorBoundary';
import { LoadingSpinner } from './components/Common/LoadingSpinner';
import './styles/globals.css';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <ErrorBoundary>
            <AppProvider>
                <Router>
                    <div className="app">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/terminal" element={<Terminal />} />
                        </Routes>
                    </div>
                </Router>
            </AppProvider>
        </ErrorBoundary>
    );
}

export default App;