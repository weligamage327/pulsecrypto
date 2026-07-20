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
    pressureContainer: {
        gap: 8,
    },
    pressureBar: {
        height: 30,
        backgroundColor: colors.surface,
        borderRadius: 4,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    pressureFill: {
        position: 'absolute',
        height: '100%',
        borderRadius: 4,
        opacity: 0.3,
    },
    pressureText: {
        color: colors.textPrimary,
        fontWeight: '600',
        marginLeft: 12,
    },
});