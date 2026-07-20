import { StyleSheet } from 'react-native';
import { colors } from '../utils/colors';

export const styles = StyleSheet.create({
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
});