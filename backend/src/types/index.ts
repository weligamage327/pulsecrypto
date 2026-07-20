// Trading pair metadata (for REST endpoint)
export interface TradingPair {
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
    displayName: string;
    status: 'TRADING' | 'HALT' | 'BREAK';
    high24h: number;
    low24h: number;
    volume24h: number;
    change24h: number;
}

// Processed market update sent to mobile clients
export interface MarketUpdate {
    pair: string;
    timestamp: number;
    price: number;
    spread: number;
    buyPressure: number;
    sellPressure: number;
    bids: [number, number][];
    asks: [number, number][];
    change24h: number;
}

// Raw data from Binance WebSocket (depth@100ms stream)
export interface BinanceStreamData {
    lastUpdateId: number;   // Changed from U/u
    bids: [string, string][]; // Changed from b
    asks: [string, string][]; // Changed from a
}

// Buffered item before processing
export interface BufferItem {
    data: BinanceStreamData;
    timestamp: number;
    pair: string;  // Added to carry pair info
}

// Messages sent through our WebSocket server
export interface WebSocketMessage {
    type: 'market_update' | 'connection_status' | 'error';
    payload: MarketUpdate | { status: string; message: string };
}