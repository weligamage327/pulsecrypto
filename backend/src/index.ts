import express from 'express';
import cors from 'cors';
import http from 'http';
import { config } from './config';
import { BinanceWebSocketService, StreamProcessor } from './services';
import { WebSocketServerService } from './gateways';
import { pairsRouter } from './routes';

// Initialize Express
const app = express();
app.use(cors({ origin: config.corsOrigins }));
app.use(express.json());

// REST Routes
app.use('/pairs', pairsRouter);

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: Date.now(),
        uptime: process.uptime()
    });
});

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket server
const wsServer = new WebSocketServerService();
wsServer.initialize(server);

// Initialize stream processor
const streamProcessor = new StreamProcessor();

// Listen for processed updates and broadcast to clients
streamProcessor.on('processed_update', (update) => {
    wsServer.broadcastUpdate(update);
});

// Initialize Binance WebSocket
const binanceWS = new BinanceWebSocketService();

// Forward raw updates to stream processor
binanceWS.on('update', (bufferItem) => {
    streamProcessor.addToBuffer(bufferItem);
});

// Log connection status changes
binanceWS.on('connection_status', (status) => {
    console.log('[Main] Binance connection status:', status);
});

// Start the server
server.listen(config.port, () => {
    console.log(`\n🚀 PulseCrypto Backend`);
    console.log(`├── REST API: http://localhost:${config.port}`);
    console.log(`├── WebSocket: ws://localhost:${config.port}/ws`);
    console.log(`└── Monitoring: ${config.supportedPairs.length} trading pairs\n`);

    // Connect to Binance
    binanceWS.connect(config.supportedPairs);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n[Main] SIGTERM received. Shutting down gracefully...');
    binanceWS.disconnect();
    streamProcessor.stop();
    wsServer.shutdown();
    server.close(() => {
        console.log('[Main] Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n[Main] SIGINT received. Shutting down...');
    binanceWS.disconnect();
    streamProcessor.stop();
    wsServer.shutdown();
    server.close(() => {
        process.exit(0);
    });
});