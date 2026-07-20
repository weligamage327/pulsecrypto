import { useState, useEffect, useCallback } from 'react';
import { MarketData, MarketUpdate } from '../types';
import { apiService } from '../services/api.service';
import { useFavorites } from './useFavorites';
import { useWebSocket } from './useWebSocket';
import { mapPairToMarketData, applyMarketUpdate } from '../utils/mappers';

export function useMarketData() {
    const [marketDataList, setMarketDataList] = useState<MarketData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toggleFavorite, isFavorite } = useFavorites();

    const handleUpdate = useCallback((update: MarketUpdate) => {
        setMarketDataList(prevList =>
            prevList.map(item =>
                item.pair === update.pair ? applyMarketUpdate(item, update) : item
            )
        );
    }, []);

    const { isConnected } = useWebSocket(handleUpdate);

    useEffect(() => {
        initializeData();
    }, []);

    const initializeData = async () => {
        try {
            const pairs = await apiService.getPairsMeta();
            const initialList = pairs.map(pair =>
                mapPairToMarketData(pair, isFavorite(pair.symbol))
            );
            setMarketDataList(initialList);
            setIsLoading(false);
        } catch (error) {
            console.error('Error initializing data:', error);
            setIsLoading(false);
        }
    };

    const handleToggleFavorite = useCallback(async (pair: string) => {
        const newFavorites = await toggleFavorite(pair);

        setMarketDataList(prevList =>
            prevList.map(item =>
                item.pair === pair
                    ? { ...item, isFavorite: newFavorites.has(pair) }
                    : item
            )
        );
    }, [toggleFavorite]);

    const refreshMetadata = async () => {
        try {
            const pairs = await apiService.getPairsMeta();
            setMarketDataList(prevList =>
                prevList.map(item => {
                    const pair = pairs.find(p => p.symbol === item.pair);
                    if (pair) {
                        return {
                            ...item,
                            change24h: pair.change24h,
                            high24h: pair.high24h,
                            low24h: pair.low24h,
                            volume24h: pair.volume24h,
                            displayName: pair.displayName,
                        };
                    }
                    return item;
                })
            );
        } catch (error) {
            console.error('Error refreshing metadata:', error);
            throw error;
        }
    };

    return {
        marketDataList,
        isConnected,
        isLoading,
        toggleFavorite: handleToggleFavorite,
        refreshMetadata,
    };
}