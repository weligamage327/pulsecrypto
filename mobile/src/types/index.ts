// Trading pair metadata
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
    lastPrice: number;
}

// Market update from WebSocket
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

// WebSocket message envelope
export interface WebSocketMessage {
    type: 'market_update' | 'connection_status' | 'error';
    payload: MarketUpdate | { status: string; message: string };
}

// Market data for display
export interface MarketData {
    pair: string;
    baseAsset: string;
    quoteAsset: string;
    displayName: string;
    price: number;
    spread: number;
    buyPressure: number;
    sellPressure: number;
    change24h: number;
    high24h: number;
    low24h: number;
    volume24h: number;
    bids: [number, number][];
    asks: [number, number][];
    isFavorite: boolean;
    lastUpdated: number;
}

// Navigation types
export type RootStackParamList = {
    Watchlist: undefined;
    MarketDetail: { pair: string };
};