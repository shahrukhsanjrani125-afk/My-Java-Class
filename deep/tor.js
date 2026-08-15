// backend/src/config/tor.js
import { SocksProxyAgent } from 'socks-proxy-agent';
import axios from 'axios';
import { logger } from '../middleware/logger.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

class TORService {
    constructor() {
        this.host = process.env.TOR_HOST || '127.0.0.1';
        this.port = parseInt(process.env.TOR_PORT) || 9050;
        this.controlPort = parseInt(process.env.TOR_CONTROL_PORT) || 9051;
        this.password = process.env.TOR_PASSWORD || '';
        this.agent = null;
        this.isRunning = false;
        this.circuitId = null;
    }

    async initialize() {
        try {
            // Check if TOR is running
            await this.checkTorRunning();
            
            // Create SOCKS proxy agent
            this.agent = new SocksProxyAgent(`socks5://${this.host}:${this.port}`);
            
            // Test connection
            await this.testConnection();
            
            this.isRunning = true;
            logger.info('TOR service initialized successfully');
            
            // Rotate circuit
            await this.rotateCircuit();
            
            return this;
        } catch (error) {
            logger.error('TOR initialization failed:', error);
            throw error;
        }
    }

    async checkTorRunning() {
        try {
            const { stdout } = await execAsync(`nc -zv ${this.host} ${this.port} 2>&1`);
            if (stdout.includes('succeeded') || stdout.includes('Connected')) {
                return true;
            }
            throw new Error('TOR not running');
        } catch (error) {
            // Try alternative method
            try {
                await axios.get(`http://${this.host}:${this.port}`, {
                    timeout: 3000
                });
                return true;
            } catch (e) {
                logger.warn('TOR not detected, attempting to start...');
                await this.startTor();
            }
        }
    }

    async startTor() {
        try {
            if (process.platform === 'win32') {
                await execAsync('start /B tor.exe');
            } else {
                await execAsync('tor --quiet &');
            }
            
            // Wait for TOR to start
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            logger.info('TOR started successfully');
        } catch (error) {
            logger.error('Failed to start TOR:', error);
            throw new Error('TOR service unavailable');
        }
    }

    async testConnection() {
        try {
            const response = await axios.get('https://check.torproject.org/api/ip', {
                httpsAgent: this.agent,
                timeout: 10000
            });
            
            if (response.data.IsTor) {
                logger.info('TOR connection verified');
                return true;
            }
            throw new Error('Not connected via TOR');
        } catch (error) {
            logger.error('TOR connection test failed:', error);
            throw error;
        }
    }

    async rotateCircuit() {
        try {
            if (!this.controlPort) {
                logger.warn('TOR control port not configured, skipping circuit rotation');
                return;
            }

            // Connect to TOR control port
            const response = await axios.post(
                `http://${this.host}:${this.controlPort}`,
                'SIGNAL NEWNYM',
                {
                    auth: this.password ? { password: this.password } : undefined,
                    timeout: 5000
                }
            );
            
            logger.info('TOR circuit rotated');
            this.circuitId = Date.now();
        } catch (error) {
            logger.warn('Failed to rotate TOR circuit:', error.message);
        }
    }

    async makeRequest(url, options = {}) {
        if (!this.isRunning) {
            throw new Error('TOR service not running');
        }

        try {
            const response = await axios({
                url,
                ...options,
                httpsAgent: this.agent,
                timeout: options.timeout || 30000
            });
            
            return response.data;
        } catch (error) {
            logger.error('TOR request failed:', error);
            
            // If connection fails, try to reconnect
            if (error.code === 'ECONNREFUSED') {
                await this.checkTorRunning();
            }
            
            throw error;
        }
    }

    getProxyAgent() {
        return this.agent;
    }

    async stop() {
        this.isRunning = false;
        logger.info('TOR service stopped');
    }

    // Automatic circuit rotation interval
    startAutoRotate(interval = 3600000) { // 1 hour default
        this.rotateInterval = setInterval(() => {
            this.rotateCircuit().catch(error => {
                logger.warn('Auto-rotation failed:', error);
            });
        }, interval);
    }

    stopAutoRotate() {
        if (this.rotateInterval) {
            clearInterval(this.rotateInterval);
            this.rotateInterval = null;
        }
    }
}

let torInstance = null;

export const setupTOR = async () => {
    if (!torInstance) {
        torInstance = new TORService();
        await torInstance.initialize();
        // Start auto-rotation
        torInstance.startAutoRotate();
    }
    return torInstance;
};

export { torInstance as torService };