export function formatPrice(price: number, decimals: number = 2): number {
    return Math.round(price * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function formatVolume(volume: number): number {
    return Math.round(volume * 10000) / 10000;
}

export function formatPercent(value: number): number {
    return Math.round(value * 100) / 100;
}