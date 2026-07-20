import { BinanceStreamData } from '../types';

interface OrderBook {
    bids: Map<number, number>;
    asks: Map<number, number>;
    lastUpdateId: number;
}

export function updateOrderBookFromSnapshot(orderBook: OrderBook, data: BinanceStreamData): void {
    orderBook.lastUpdateId = data.lastUpdateId;
    orderBook.bids.clear();
    orderBook.asks.clear();

    data.bids.forEach(([price, quantity]) => {
        const p = parseFloat(price);
        const q = parseFloat(quantity);
        if (q > 0) {
            orderBook.bids.set(p, q);
        }
    });

    data.asks.forEach(([price, quantity]) => {
        const p = parseFloat(price);
        const q = parseFloat(quantity);
        if (q > 0) {
            orderBook.asks.set(p, q);
        }
    });
}