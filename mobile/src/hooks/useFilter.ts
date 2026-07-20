import { useState, useMemo, useEffect, useRef } from 'react';
import { MarketData } from '../types';

export function useFilter(data: MarketData[]) {
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            setDebouncedSearch(searchInput);
        }, 300);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [searchInput]);

    const filteredData = useMemo(() => {
        let result = data;

        if (showFavoritesOnly) {
            result = result.filter(item => item.isFavorite);
        }

        if (debouncedSearch.trim()) {
            const query = debouncedSearch.toLowerCase();
            result = result.filter(item =>
                item.baseAsset.toLowerCase().includes(query) ||
                item.pair.toLowerCase().includes(query)
            );
        }

        return result;
    }, [data, debouncedSearch, showFavoritesOnly]);

    return {
        searchQuery: searchInput,
        setSearchQuery: setSearchInput,
        showFavoritesOnly,
        setShowFavoritesOnly,
        filteredData,
    };
}