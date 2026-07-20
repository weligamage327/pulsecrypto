import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@pulse_crypto_favorites';

export function useFavorites() {
    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const stored = await AsyncStorage.getItem(FAVORITES_KEY);
            if (stored) {
                setFavorites(new Set(JSON.parse(stored)));
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    };

    const saveFavorites = async (newFavorites: Set<string>) => {
        try {
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([...newFavorites]));
            setFavorites(newFavorites);
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    };

    const toggleFavorite = useCallback(async (pair: string) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(pair)) {
            newFavorites.delete(pair);
        } else {
            newFavorites.add(pair);
        }
        await saveFavorites(newFavorites);
        return newFavorites; // Return new set
    }, [favorites]);

    const isFavorite = useCallback((pair: string) => {
        return favorites.has(pair);
    }, [favorites]);

    return {
        favorites,
        toggleFavorite,
        isFavorite,
    };
}