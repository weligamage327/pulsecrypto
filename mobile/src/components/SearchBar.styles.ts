import { StyleSheet } from 'react-native';
import { colors } from '../utils/colors';

export const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 8,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        color: colors.textPrimary,
        fontSize: 16,
    },
    filterButton: {
        backgroundColor: colors.surface,
        borderRadius: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterActive: {
        backgroundColor: colors.accent,
    },
    filterText: {
        color: colors.textMuted,
        fontSize: 20,
    },
    filterTextActive: {
        color: colors.textPrimary,
    },
});