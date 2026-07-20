import React from 'react';
import { View, Text } from 'react-native';
import { formatPrice, formatVolume } from '../utils/formatters';
import { colors } from '../utils/colors';
import { styles } from './OrderBook.styles';

interface OrderBookProps {
    bids: [number, number][];
    asks: [number, number][];
    spread: number;
}

export function OrderBook({ bids, asks, spread }: OrderBookProps) {
    const getMaxVolume = () => {
        const allVolumes = [
            ...bids.map(([, qty]) => qty),
            ...asks.map(([, qty]) => qty),
        ];
        return Math.max(...allVolumes, 1);
    };

    const maxVol = getMaxVolume();

    return (
        <View style={styles.container}>
            <View style={styles.sectionTitle}>
                <Text style={styles.titleText}>Order Book</Text>
            </View>

            {asks.length > 0 && (
                <View style={styles.orderBookSection}>
                    {asks.slice(0, 10).reverse().map(([price, qty], index) => {
                        const volumeWidth = (qty / maxVol) * 100;
                        return (
                            <View key={`ask-${index}`} style={styles.orderRow}>
                                <View style={[styles.volumeBar, {
                                    width: `${volumeWidth}%`,
                                    backgroundColor: colors.askBackground
                                }]} />
                                <Text style={[styles.orderPrice, styles.askPrice]}>
                                    {formatPrice(price)}
                                </Text>
                                <Text style={styles.orderVolume}>
                                    {formatVolume(qty)}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            )}

            <View style={styles.spreadLine}>
                <Text style={styles.spreadText}>
                    Spread: ${spread}
                </Text>
            </View>

            {bids.length > 0 && (
                <View style={styles.orderBookSection}>
                    {bids.slice(0, 10).map(([price, qty], index) => {
                        const volumeWidth = (qty / maxVol) * 100;
                        return (
                            <View key={`bid-${index}`} style={styles.orderRow}>
                                <View style={[styles.volumeBar, {
                                    width: `${volumeWidth}%`,
                                    backgroundColor: colors.bidBackground
                                }]} />
                                <Text style={[styles.orderPrice, styles.bidPrice]}>
                                    {formatPrice(price)}
                                </Text>
                                <Text style={styles.orderVolume}>
                                    {formatVolume(qty)}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            )}
        </View>
    );
}