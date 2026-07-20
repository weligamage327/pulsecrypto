import { MarketUpdate } from '../types';
import { formatPrice, formatVolume } from './formatters';

interface OrderBookLevel {
    price: number;
    quantity: number;
}

interface MarketData {
    pair: string;
    bestBid: number;
    bestAsk: number;
    bids: [number, number][];
    asks: [number, number][];
}

export function toMarketUpdate(data: MarketData): Omit<MarketUpdate, 'timestamp' | 'change24h'> {
    const price = (data.bestBid + data.bestAsk) / 2;
    const spread = data.bestAsk - data.bestBid;

    const bidVolume = data.bids.reduce((sum, [, qty]) => sum + qty, 0);
    const askVolume = data.asks.reduce((sum, [, qty]) => sum + qty, 0);
    const totalVolume = bidVolume + askVolume;

    return {
        pair: data.pair,
        price: formatPrice(price),
        spread: formatPrice(spread),
        buyPressure: totalVolume > 0 ? Math.round((bidVolume / totalVolume) * 100) : 50,
        sellPressure: totalVolume > 0 ? Math.round((askVolume / totalVolume) * 100) : 50,
        bids: data.bids.map(([p, q]) => [p, formatVolume(q)] as [number, number]),
        asks: data.asks.map(([p, q]) => [p, formatVolume(q)] as [number, number]),
    };
}

export function toFormattedLevels(
    levels: Map<number, number>,
    order: 'asc' | 'desc',
    limit: number
): [number, number][] {
    return Array.from(levels.entries())
        .sort(([a], [b]) => order === 'desc' ? b - a : a - b)
        .slice(0, limit);
}