import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import { useMarketData } from '../hooks/useMarketData';
import { useFilter } from '../hooks/useFilter';
import { MarketData } from '../types';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { SearchBar } from '../components/SearchBar';
import { PairRow } from '../components/PairRow';
import { colors } from '../utils/colors';
import { watchlistStyles as styles } from './styles';

export default function WatchlistScreen() {
    const {
        marketDataList,
        isConnected,
        isLoading,
        toggleFavorite,
        refreshMetadata,
    } = useMarketData();

    const {
        searchQuery,
        setSearchQuery,
        showFavoritesOnly,
        setShowFavoritesOnly,
        filteredData,
    } = useFilter(marketDataList);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await refreshMetadata();
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error('Refresh failed:', error);
        }
        setRefreshing(false);
    };

    const renderItem = ({ item }: { item: MarketData }) => (
        <PairRow
            item={item}
            isConnected={isConnected}
            onToggleFavorite={toggleFavorite}
        />
    );

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={colors.accent} />
                <Text style={styles.loadingText}>Loading market data...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ConnectionStatus isConnected={isConnected} />

            <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
                showFavoritesOnly={showFavoritesOnly}
            />

            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={item => `${item.pair}-${item.price}`}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.accent}
                        colors={[colors.accent]}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.centerContainer}>
                        <Text style={styles.emptyText}>No pairs found</Text>
                    </View>
                }
            />
        </View>
    );
}