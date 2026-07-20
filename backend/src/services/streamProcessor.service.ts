import { EventEmitter } from 'events';
import { config } from '../config';
import { BufferItem, MarketUpdate } from '../types';
import { calculatePrice, calculateSpread, calculateBuyPressure, calculateSellPressure, calculate24hChange, formatLevels, getTopLevels } from '../utils/calculations';
import { updateOrderBookFromSnapshot } from '../utils/orderbook';
import { validateOrderBook } from '../utils/validation';

interface OrderBook {
    bids: Map<number, number>;
    asks: Map<number, number>;
    lastUpdateId: number;
}

export class StreamProcessor extends EventEmitter {
    private buffer: Map<string, BufferItem[]> = new Map();
    private orderBooks: Map<string, OrderBook> = new Map();
    private emissionInterval: NodeJS.Timeout | null = null;
    private previousPrices: Map<string, number> = new Map();

    constructor() {
        super();
        this.startProcessing();
    }

    addToBuffer(item: BufferItem): void {
        const pairBuffer = this.getOrCreateBuffer(item.pair);

        if (pairBuffer.length >= config.maxBufferSize) {
            pairBuffer.shift();
        }

        pairBuffer.push(item);
        this.updateOrderBook(item);
    }

    private getOrCreateBuffer(pair: string): BufferItem[] {
        if (!this.buffer.has(pair)) {
            this.buffer.set(pair, []);
        }
        return this.buffer.get(pair)!;
    }

    private updateOrderBook(item: BufferItem): void {
        const orderBook = this.getOrCreateOrderBook(item.pair);

        if (item.data.lastUpdateId <= orderBook.lastUpdateId) {
            return;
        }

        updateOrderBookFromSnapshot(orderBook, item.data);
    }

    private getOrCreateOrderBook(pair: string): OrderBook {
        if (!this.orderBooks.has(pair)) {
            this.orderBooks.set(pair, { bids: new Map(), asks: new Map(), lastUpdateId: 0 });
        }
        return this.orderBooks.get(pair)!;
    }

    private startProcessing(): void {
        this.emissionInterval = setInterval(() => this.processAllPairs(), config.bufferIntervalMs);
    }

    private processAllPairs(): void {
        this.buffer.forEach((_, pair) => {
            try {
                const update = this.processPair(pair);
                this.emit('processed_update', update);
            } catch (error) { }
        });
        this.buffer.clear();
    }

    private processPair(pair: string): MarketUpdate {
        const orderBook = this.orderBooks.get(pair);
        if (!orderBook) throw new Error(`No order book for ${pair}`);

        const bids = getTopLevels(orderBook.bids, 'desc', 10);
        const asks = getTopLevels(orderBook.asks, 'asc', 10);

        validateOrderBook(pair, bids, asks);

        const bestBid = bids[0][0];
        const bestAsk = asks[0][0];

        return {
            pair,
            timestamp: Date.now(),
            price: calculatePrice(bestBid, bestAsk),
            spread: calculateSpread(bestBid, bestAsk),
            buyPressure: calculateBuyPressure(bids, asks),
            sellPressure: calculateSellPressure(bids, asks),
            bids: formatLevels(bids),
            asks: formatLevels(asks),
            change24h: calculate24hChange(pair, bestBid, bestAsk, this.previousPrices),
        };
    }

    stop(): void {
        if (this.emissionInterval) {
            clearInterval(this.emissionInterval);
            this.emissionInterval = null;
        }
    }
}