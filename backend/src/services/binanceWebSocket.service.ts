import WebSocket from 'ws';
import { EventEmitter } from 'events';
import { BinanceStreamData, BufferItem } from '../types';
import { config } from '../config';

export class BinanceWebSocketService extends EventEmitter {
    private ws: WebSocket | null = null;
    private reconnectAttempts = 0;
    private readonly maxReconnectAttempts = 5;
    private readonly reconnectDelay = 1000;
    private streams: string[] = [];
    private pingInterval: NodeJS.Timeout | null = null;
    private isConnected = false;

    connect(pairs: string[]): void {
        this.streams = pairs.map(pair => `${pair.toLowerCase()}@depth20@100ms`);

        const streamUrl = `${config.binanceStreamUrl}/stream?streams=${this.streams.join('/')}`;

        try {
            this.ws = new WebSocket(streamUrl);

            this.ws.on('open', () => {
                console.log('[BinanceWS] Connected successfully');
                this.isConnected = true;
                this.reconnectAttempts = 0;
                this.emit('connection_status', { status: 'connected' });

                this.pingInterval = setInterval(() => {
                    if (this.ws?.readyState === WebSocket.OPEN) {
                        this.ws.ping();
                    }
                }, 180000);
            });

            this.ws.on('message', (data: WebSocket.Data) => {
                try {
                    const parsed = JSON.parse(data.toString());

                    if (parsed.data) {
                        const streamData: BinanceStreamData = parsed.data;
                        const pair = parsed.stream.split('@')[0].toUpperCase();

                        const bufferItem: BufferItem = {
                            data: streamData,
                            timestamp: Date.now(),
                            pair: pair
                        };

                        this.emit('update', bufferItem);
                    }
                } catch (error) {
                    console.error('[BinanceWS] Error parsing message:', error);
                }
            });

            this.ws.on('error', (error) => {
                console.error('[BinanceWS] WebSocket error:', error);
                this.emit('error', error);
            });

            this.ws.on('close', (code, reason) => {
                console.log(`[BinanceWS] Connection closed: ${code} - ${reason}`);
                this.isConnected = false;
                this.emit('connection_status', { status: 'disconnected', code, reason });
                this.cleanup();
                this.attemptReconnect();
            });

        } catch (error) {
            console.error('[BinanceWS] Failed to create WebSocket:', error);
            this.attemptReconnect();
        }
    }

    private cleanup(): void {
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
            this.pingInterval = null;
        }
    }

    private attemptReconnect(): void {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts);

            setTimeout(() => {
                this.reconnectAttempts++;
                const pairs = this.streams.map(stream => stream.split('@')[0].toUpperCase());
                this.connect(pairs);
            }, delay);
        } else {
            console.error('[BinanceWS] Max reconnection attempts reached');
            this.emit('error', new Error('Max reconnection attempts reached'));
        }
    }

    getConnectionStatus(): boolean {
        return this.isConnected;
    }

    disconnect(): void {
        console.log('[BinanceWS] Disconnecting...');
        this.cleanup();
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.isConnected = false;
    }
}