import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MarketData } from '../types';
import { formatPrice, formatChange } from '../utils/formatters';
import { styles } from './PairRow.styles';

interface PairRowProps {
    item: MarketData;
    isConnected: boolean;
    onToggleFavorite: (pair: string) => void;
}

export function PairRow({ item, isConnected, onToggleFavorite }: PairRowProps) {
    const router = useRouter();
    const isPositive = item.change24h >= 0;
    const hasPrice = item.price > 0;

    return (
        <TouchableOpacity
            style={styles.row}
            onPress={() => router.push(`/market/${item.pair}`)}
        >
            <TouchableOpacity
                onPress={() => onToggleFavorite(item.pair)}
                style={styles.favoriteButton}
            >
                <Text style={[styles.favoriteIcon, item.isFavorite && styles.favoriteActive]}>
                    {item.isFavorite ? '★' : '☆'}
                </Text>
            </TouchableOpacity>

            <View style={styles.pairInfo}>
                <Text style={styles.pairName}>
                    {item.baseAsset} / {item.quoteAsset}
                </Text>
                <Text style={styles.pairStatus}>
                    Vol: ${(item.volume24h / 1000000).toFixed(1)}M
                </Text>
            </View>

            <View style={styles.priceContainer}>
                <Text style={styles.price}>
                    {hasPrice ? formatPrice(item.price) : '---.--'}
                </Text>
                <Text style={[styles.change, isPositive ? styles.positive : styles.negative]}>
                    {hasPrice ? formatChange(item.change24h) : '--.--%'}
                </Text>
            </View>

            <View style={[styles.indicator, isConnected ? styles.connected : styles.disconnected]} />
        </TouchableOpacity>
    );
}