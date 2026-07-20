import { StyleSheet } from 'react-native';
import { colors } from '../utils/colors';

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.surface,
    },
    sectionTitle: {
        marginBottom: 12,
    },
    titleText: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    orderBookSection: {
        gap: 2,
    },
    orderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        position: 'relative',
    },
    volumeBar: {
        position: 'absolute',
        height: '100%',
        right: 0,
    },
    orderPrice: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        zIndex: 1,
        paddingLeft: 4,
    },
    bidPrice: {
        color: colors.bidColor,
    },
    askPrice: {
        color: colors.askColor,
    },
    orderVolume: {
        color: colors.textSecondary,
        fontSize: 12,
        zIndex: 1,
        paddingRight: 4,
    },
    spreadLine: {
        paddingVertical: 8,
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.surface,
        marginVertical: 4,
    },
    spreadText: {
        color: colors.accent,
        fontSize: 12,
        fontWeight: '600',
    },
});