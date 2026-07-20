import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from './ConnectionStatus.styles';

interface ConnectionStatusProps {
    isConnected: boolean;
}

export function ConnectionStatus({ isConnected }: ConnectionStatusProps) {
    return (
        <View style={[styles.statusBar, isConnected ? styles.connected : styles.disconnected]}>
            <Text style={styles.statusText}>
                {isConnected ? '● Live' : '○ Disconnected'}
            </Text>
        </View>
    );
}