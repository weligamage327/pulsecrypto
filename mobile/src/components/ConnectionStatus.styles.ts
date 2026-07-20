import { StyleSheet } from 'react-native';
import { colors } from '../utils/colors';

export const styles = StyleSheet.create({
    statusBar: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    connected: {
        backgroundColor: colors.connected,
    },
    disconnected: {
        backgroundColor: colors.disconnected,
    },
    statusText: {
        color: colors.textPrimary,
        fontWeight: '600',
    },
});