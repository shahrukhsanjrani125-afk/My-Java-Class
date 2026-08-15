// backend/src/config/telegram.js
import TelegramBot from 'node-telegram-bot-api';
import { logger } from '../middleware/logger.js';
import { formatSignalMessage } from '../utils/formatters.js';

class TelegramService {
    constructor() {
        this.token = process.env.TELEGRAM_BOT_TOKEN;
        this.chatId = process.env.TELEGRAM_CHAT_ID || '6388422222';
        this.bot = null;
        this.isRunning = false;
    }

    async initialize() {
        if (!this.token) {
            throw new Error('TELEGRAM_BOT_TOKEN is required');
        }

        this.bot = new TelegramBot(this.token, { polling: true });
        
        // Set up event handlers
        this.bot.on('message', this.handleMessage.bind(this));
        this.bot.on('error', this.handleError.bind(this));
        
        // Get bot info
        try {
            const me = await this.bot.getMe();
            logger.info(`Telegram bot initialized: @${me.username}`);
            this.isRunning = true;
        } catch (error) {
            logger.error('Telegram initialization failed:', error);
            throw error;
        }

        return this;
    }

    async sendSignal(signal) {
        if (!this.isRunning) {
            logger.warn('Telegram bot not running, signal not sent');
            return;
        }

        try {
            const message = formatSignalMessage(signal);
            
            // Send with inline keyboard for quick actions
            const options = {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '📊 View Chart', callback_data: `chart_${signal._id}` },
                            { text: '📈 More Details', callback_data: `details_${signal._id}` }
                        ],
                        [
                            { text: '🔔 Subscribe', callback_data: 'subscribe' },
                            { text: '❌ Dismiss', callback_data: 'dismiss' }
                        ]
                    ]
                }
            };
            
            await this.bot.sendMessage(this.chatId, message, options);
            logger.info(`Signal sent to Telegram: ${signal.asset} ${signal.direction}`);
        } catch (error) {
            logger.error('Failed to send Telegram message:', error);
            throw error;
        }
    }

    async handleMessage(msg) {
        const chatId = msg.chat.id;
        const text = msg.text;

        if (!text) return;

        // Handle commands
        if (text.startsWith('/')) {
            const command = text.split(' ')[0];
            
            switch (command) {
                case '/start':
                    await this.bot.sendMessage(chatId, 
                        '🦈 Welcome to SHARK VIP Signal Bot!\n\n' +
                        'Available commands:\n' +
                        '/status - Get current system status\n' +
                        '/signal - Get latest signal\n' +
                        '/subscribe - Subscribe to VIP signals\n' +
                        '/unsubscribe - Unsubscribe from signals'
                    );
                    break;
                    
                case '/status':
                    await this.sendStatus(chatId);
                    break;
                    
                case '/signal':
                    await this.sendLatestSignal(chatId);
                    break;
            }
        }
    }

    async sendStatus(chatId) {
        const status = {
            system: 'online',
            signalsGenerated: 0, // Would fetch from DB
            uptime: process.uptime()
        };
        
        await this.bot.sendMessage(chatId, 
            `📊 SHARK VIP System Status\n\n` +
            `🟢 System: ${status.system}\n` +
            `📡 Signals: ${status.signalsGenerated}\n` +
            `⏱️ Uptime: ${Math.floor(status.uptime / 3600)}h`
        );
    }

    async sendLatestSignal(chatId) {
        // Would fetch latest signal from database
        await this.bot.sendMessage(chatId, 
            'Fetching latest signal...\nPlease check the dashboard.'
        );
    }

    handleError(error) {
        logger.error('Telegram bot error:', error);
    }

    async stop() {
        if (this.bot) {
            await this.bot.stopPolling();
            this.isRunning = false;
            logger.info('Telegram bot stopped');
        }
    }
}

let telegramInstance = null;

export const initializeTelegram = async () => {
    if (!telegramInstance) {
        telegramInstance = new TelegramService();
        await telegramInstance.initialize();
    }
    return telegramInstance;
};

export { telegramInstance as telegramService };