import { TradingPair, MarketData, MarketUpdate } from '../types';

export function mapPairToMarketData(pair: TradingPair, isFavorite: boolean): MarketData {
    return {
        pair: pair.symbol,
        baseAsset: pair.baseAsset,
        quoteAsset: pair.quoteAsset,
        displayName: pair.displayName,
        price: 0,
        spread: 0,
        buyPressure: 0,
        sellPressure: 0,
        change24h: pair.change24h,
        high24h: pair.high24h,
        low24h: pair.low24h,
        volume24h: pair.volume24h,
        bids: [],
        asks: [],
        isFavorite,
        lastUpdated: 0,
    };
}

export function applyMarketUpdate(item: MarketData, update: MarketUpdate): MarketData {
    return {
        ...item,
        price: update.price,
        spread: update.spread,
        buyPressure: update.buyPressure,
        sellPressure: update.sellPressure,
        bids: update.bids,
        asks: update.asks,
        lastUpdated: update.timestamp,
    };
}