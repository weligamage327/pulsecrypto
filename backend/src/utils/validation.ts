export function validateOrderBook(
    pair: string,
    bids: [number, number][],
    asks: [number, number][]
): void {
    if (bids.length === 0 || asks.length === 0) {
        throw new Error(`Incomplete order book for ${pair}`);
    }
}