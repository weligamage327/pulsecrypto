import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const marketDetailStyles = StyleSheet.create({
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
    priceHeader: {
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.surface,
    },
    pairLabel: {
        color: colors.textSecondary,
        fontSize: 14,
        marginBottom: 8,
    },
    currentPrice: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    change24h: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 8,
    },
    positive: {
        color: colors.positive,
    },
    negative: {
        color: colors.negative,
    },
    section: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.surface,
    },
    sectionTitle: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: 12,
        letterSpacing: 1,
    },
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    infoItem: {
        width: '50%',
        marginBottom: 12,
    },
    infoLabel: {
        color: colors.textSecondary,
        fontSize: 12,
        marginBottom: 4,
    },
    infoValue: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: '600',
    },
    lastUpdated: {
        color: colors.textMuted,
        fontSize: 12,
        textAlign: 'center',
        padding: 16,
    },
});