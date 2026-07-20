import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { EventEmitter } from 'events';
import { MarketUpdate, WebSocketMessage } from '../types';
import { config } from '../config';
import {
    ClientInfo,
    createClientInfo,
    startHeartbeat,
    handleClientMessage,
    shouldSendToClient
} from '../utils/clientManager';

export class WebSocketServerService extends EventEmitter {
    private wss: WebSocketServer | null = null;
    private clients: Map<WebSocket, ClientInfo> = new Map();
    private heartbeatInterval: NodeJS.Timeout | null = null;

    initialize(server: Server): void {
        this.wss = new WebSocketServer({ server, path: '/ws' });
        console.log(`[WSServer] WebSocket server initialized`);

        this.wss.on('connection', (clientWs: WebSocket) => {
            const clientInfo = createClientInfo(clientWs);
            this.clients.set(clientWs, clientInfo);
            console.log(`[WSServer] Client connected. Total clients: ${this.clients.size}`);

            this.sendWelcome(clientWs);

            clientWs.on('message', (data: Buffer) => {
                try {
                    handleClientMessage(data, clientInfo);
                } catch (error) {
                    console.error('[WSServer] Error processing client message:', error);
                }
            });

            clientWs.on('close', () => {
                this.clients.delete(clientWs);
                console.log(`[WSServer] Client disconnected. Remaining: ${this.clients.size}`);
            });

            clientWs.on('error', (error) => {
                console.error('[WSServer] Client error:', error);
                this.clients.delete(clientWs);
            });

            clientWs.on('pong', () => {
                clientInfo.lastActivity = Date.now();
            });
        });

        this.heartbeatInterval = startHeartbeat(
            this.clients,
            config.clientTimeoutMs,
            config.heartbeatIntervalMs
        );
    }

    private sendWelcome(ws: WebSocket): void {
        this.sendToClient(ws, {
            type: 'connection_status',
            payload: {
                status: 'connected',
                message: 'Connected to PulseCrypto market data stream'
            }
        });
    }

    broadcastUpdate(update: MarketUpdate): void {
        const messageStr = JSON.stringify({
            type: 'market_update',
            payload: update
        });

        this.clients.forEach((info, ws) => {
            if (ws.readyState === WebSocket.OPEN && shouldSendToClient(info, update.pair)) {
                ws.send(messageStr);
            }
        });
    }

    private sendToClient(ws: WebSocket, message: WebSocketMessage): void {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        }
    }

    getConnectedClientsCount(): number {
        return this.clients.size;
    }

    shutdown(): void {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
        }

        this.clients.forEach((_, ws) => {
            ws.close(1000, 'Server shutting down');
        });

        if (this.wss) {
            this.wss.close();
        }

        console.log('[WSServer] Shut down');
    }
}