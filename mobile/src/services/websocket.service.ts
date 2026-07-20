import { MarketUpdate, WebSocketMessage } from '../types';
import { config } from '../config/api';

type MarketUpdateCallback = (update: MarketUpdate) => void;
type ConnectionCallback = (connected: boolean) => void;

class WebSocketService {
    private ws: WebSocket | null = null;
    private url: string;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 2000;
    private onMarketUpdate: MarketUpdateCallback | null = null;
    private onConnectionChange: ConnectionCallback | null = null;
    private isConnected = false;
    private isConnecting = false;
    private reconnectTimer: NodeJS.Timeout | null = null;

    constructor(url: string = config.WS_URL) {
        this.url = url;
    }

    connect(): void {
        if (this.isConnecting || this.isConnected) {
            return;
        }

        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }

        this.isConnecting = true;

        try {
            this.ws = new WebSocket(this.url);

            this.ws.onopen = () => {
                this.isConnected = true;
                this.isConnecting = false;
                this.reconnectAttempts = 0;
                this.onConnectionChange?.(true);
            };

            this.ws.onmessage = (event: WebSocketMessageEvent) => {
                try {
                    const message: WebSocketMessage = JSON.parse(event.data);

                    if (message.type === 'market_update') {
                        this.onMarketUpdate?.(message.payload as MarketUpdate);
                    }
                } catch (error) {
                    // Ignore parse errors
                }
            };

            this.ws.onerror = () => {
                this.isConnecting = false;
            };

            this.ws.onclose = () => {
                this.isConnected = false;
                this.isConnecting = false;
                this.onConnectionChange?.(false);
                this.attemptReconnect();
            };

        } catch (error) {
            this.isConnecting = false;
            this.attemptReconnect();
        }
    }

    private attemptReconnect(): void {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
        }

        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            const delay = this.reconnectDelay * this.reconnectAttempts;

            this.reconnectTimer = setTimeout(() => {
                this.connect();
            }, delay);
        }
    }

    setOnMarketUpdate(callback: MarketUpdateCallback): void {
        this.onMarketUpdate = callback;
    }

    setOnConnectionChange(callback: ConnectionCallback): void {
        this.onConnectionChange = callback;
    }

    disconnect(): void {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
        }
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.isConnected = false;
        this.isConnecting = false;
    }

    getConnectionStatus(): boolean {
        return this.isConnected;
    }
}

export const wsService = new WebSocketService();