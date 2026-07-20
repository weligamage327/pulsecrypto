import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from './SearchBar.styles';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    onToggleFavorites: () => void;
    showFavoritesOnly: boolean;
}

export function SearchBar({ value, onChangeText, onToggleFavorites, showFavoritesOnly }: SearchBarProps) {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search pairs..."
                placeholderTextColor="#666"
                value={value}
                onChangeText={onChangeText}
            />
            <TouchableOpacity
                style={[styles.filterButton, showFavoritesOnly && styles.filterActive]}
                onPress={onToggleFavorites}
            >
                <Text style={[styles.filterText, showFavoritesOnly && styles.filterTextActive]}>
                    ★
                </Text>
            </TouchableOpacity>
        </View>
    );
}