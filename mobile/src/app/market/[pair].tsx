import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useMarketData } from '../../hooks/useMarketData';
import { MarketData } from '../../types';
import { PressureBar } from '../../components/PressureBar';
import { OrderBook } from '../../components/OrderBook';
import { formatPrice, formatChange, formatLargeNumber } from '../../utils/formatters';
import { marketDetailStyles as styles } from './styles';
import { colors } from '../../utils/colors';

export default function MarketDetailScreen() {
    const { pair } = useLocalSearchParams<{ pair: string }>();
    const { marketDataList } = useMarketData();
    const [marketItem, setMarketItem] = useState<MarketData | null>(null);

    useEffect(() => {
        const data = marketDataList.find(item => item.pair === pair && item.price > 0);
        if (data) {
            setMarketItem(data);
        }
    }, [marketDataList, pair]);

    if (!marketItem) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={colors.accent} />
                <Text style={styles.loadingText}>Loading market data...</Text>
            </View>
        );
    }

    const isPositive = marketItem.change24h >= 0;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.priceHeader}>
                <Text style={styles.pairLabel}>
                    {marketItem.baseAsset} / {marketItem.quoteAsset}
                </Text>
                <Text style={styles.currentPrice}>
                    ${formatPrice(marketItem.price)}
                </Text>
                <Text style={[styles.change24h, isPositive ? styles.positive : styles.negative]}>
                    {formatChange(marketItem.change24h)}
                </Text>
            </View>

            <PressureBar
                buyPressure={marketItem.buyPressure}
                sellPressure={marketItem.sellPressure}
            />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Market Info</Text>
                <View style={styles.infoGrid}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Spread</Text>
                        <Text style={styles.infoValue}>${marketItem.spread}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>24h High</Text>
                        <Text style={styles.infoValue}>${formatPrice(marketItem.high24h)}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>24h Low</Text>
                        <Text style={styles.infoValue}>${formatPrice(marketItem.low24h)}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>24h Volume</Text>
                        <Text style={styles.infoValue}>${formatLargeNumber(marketItem.volume24h)}</Text>
                    </View>
                </View>
            </View>

            <OrderBook
                bids={marketItem.bids}
                asks={marketItem.asks}
                spread={marketItem.spread}
            />

            <Text style={styles.lastUpdated}>
                Last updated: {new Date(marketItem.lastUpdated).toLocaleTimeString()}
            </Text>
        </ScrollView>
    );
}