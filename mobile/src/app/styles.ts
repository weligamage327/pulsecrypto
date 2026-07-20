import { StyleSheet } from 'react-native';
import { colors } from '../utils/colors';

export const watchlistStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    loadingText: {
        color: colors.textPrimary,
        marginTop: 10,
        fontSize: 16,
    },
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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.surface,
    },
    favoriteButton: {
        marginRight: 12,
        padding: 4,
    },
    favoriteIcon: {
        fontSize: 24,
        color: colors.textMuted,
    },
    favoriteActive: {
        color: colors.accent,
    },
    pairInfo: {
        flex: 1,
    },
    pairName: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: '600',
    },
    pairStatus: {
        color: colors.textSecondary,
        fontSize: 12,
        marginTop: 2,
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    price: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: '600',
    },
    change: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 2,
    },
    positive: {
        color: colors.positive,
    },
    negative: {
        color: colors.negative,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 12,
    },
    connected: {
        backgroundColor: colors.connected,
    },
    disconnected: {
        backgroundColor: colors.disconnected,
    },
    emptyText: {
        color: colors.textSecondary,
        fontSize: 16,
    },
});