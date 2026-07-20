export function calculatePrice(bestBid: number, bestAsk: number): number {
    return Math.round(((bestBid + bestAsk) / 2) * 100) / 100;
}

export function calculateSpread(bestBid: number, bestAsk: number): number {
    return Math.round((bestAsk - bestBid) * 100) / 100;
}

export function calculateVolume(levels: [number, number][]): number {
    return levels.reduce((sum, [, qty]) => sum + qty, 0);
}

export function calculateBuyPressure(bids: [number, number][], asks: [number, number][]): number {
    const bidVolume = calculateVolume(bids);
    const askVolume = calculateVolume(asks);
    const totalVolume = bidVolume + askVolume;
    return totalVolume > 0 ? Math.round((bidVolume / totalVolume) * 100) : 50;
}

export function calculateSellPressure(bids: [number, number][], asks: [number, number][]): number {
    return 100 - calculateBuyPressure(bids, asks);
}

export function calculate24hChange(
    pair: string,
    bestBid: number,
    bestAsk: number,
    previousPrices: Map<string, number>
): number {
    const price = (bestBid + bestAsk) / 2;
    const prevPrice = previousPrices.get(pair) || price;
    previousPrices.set(pair, price);
    return Math.round(((price - prevPrice) / prevPrice) * 100 * 100) / 100;
}

export function formatLevels(levels: [number, number][]): [number, number][] {
    return levels.map(([price, qty]) => [price, Math.round(qty * 10000) / 10000]);
}

export function getTopLevels(
    levels: Map<number, number>,
    order: 'asc' | 'desc',
    limit: number
): [number, number][] {
    return Array.from(levels.entries())
        .sort(([a], [b]) => order === 'desc' ? b - a : a - b)
        .slice(0, limit);
}