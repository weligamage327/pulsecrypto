import dotenv from 'dotenv';
import path from 'path';

// Load .env from backend root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
    // Server ports
    port: parseInt(process.env.PORT || '3001', 10),
    wsPort: parseInt(process.env.WS_PORT || '8080', 10),

    // Binance WebSocket settings
    binanceStreamUrl: 'wss://stream.binance.com:9443',

    // Stream processing settings
    bufferIntervalMs: parseInt(process.env.BUFFER_INTERVAL_MS || '100', 10),
    maxBufferSize: parseInt(process.env.MAX_BUFFER_SIZE || '1000', 10),

    // Trading pairs to monitor
    supportedPairs: ['btcusdt', 'ethusdt', 'solusdt', 'dogeusdt', 'xrpusdt'],

    // CORS (for mobile app in development)
    corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['*'],

    // WebSocket heartbeat interval (cleanup dead connections)
    heartbeatIntervalMs: 10000,

    // Inactive client timeout
    clientTimeoutMs: 30000,
};