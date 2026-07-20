import { TradingPair } from '../types';

export const mockPairs: TradingPair[] = [
    {
        symbol: 'BTCUSDT',
        baseAsset: 'BTC',
        quoteAsset: 'USDT',
        displayName: 'Bitcoin / Tether',
        status: 'TRADING',
        high24h: 110500.00,
        low24h: 107200.00,
        volume24h: 28500000000,
        change24h: 1.82
    },
    {
        symbol: 'ETHUSDT',
        baseAsset: 'ETH',
        quoteAsset: 'USDT',
        displayName: 'Ethereum / Tether',
        status: 'TRADING',
        high24h: 3580.00,
        low24h: 3450.00,
        volume24h: 15200000000,
        change24h: -0.41
    },
    {
        symbol: 'SOLUSDT',
        baseAsset: 'SOL',
        quoteAsset: 'USDT',
        displayName: 'Solana / Tether',
        status: 'TRADING',
        high24h: 185.00,
        low24h: 172.50,
        volume24h: 3200000000,
        change24h: 4.12
    },
    {
        symbol: 'DOGEUSDT',
        baseAsset: 'DOGE',
        quoteAsset: 'USDT',
        displayName: 'Dogecoin / Tether',
        status: 'TRADING',
        high24h: 0.42,
        low24h: 0.38,
        volume24h: 1800000000,
        change24h: 0.83
    },
    {
        symbol: 'XRPUSDT',
        baseAsset: 'XRP',
        quoteAsset: 'USDT',
        displayName: 'XRP / Tether',
        status: 'TRADING',
        high24h: 2.85,
        low24h: 2.65,
        volume24h: 2500000000,
        change24h: -1.22
    }
];