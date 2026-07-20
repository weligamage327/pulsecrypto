export const formatPrice = (price: number): string => {
    if (price >= 1) {
        return price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }
    return price.toLocaleString('en-US', {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
    });
};

export const formatChange = (change: number): string => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
};

export const formatVolume = (volume: number): string => {
    return volume.toFixed(4);
};

export const formatLargeNumber = (num: number): string => {
    if (num >= 1000000000) {
        return `${(num / 1000000000).toFixed(1)}B`;
    }
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
};