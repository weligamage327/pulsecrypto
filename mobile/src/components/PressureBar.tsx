import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../utils/colors';
import { styles } from './PressureBar.styles';

interface PressureBarProps {
    buyPressure: number;
    sellPressure: number;
}

export function PressureBar({ buyPressure, sellPressure }: PressureBarProps) {
    return (
        <View style={styles.container}>
            <View style={styles.sectionTitle}>
                <Text style={styles.titleText}>Market Pressure</Text>
            </View>
            <View style={styles.pressureContainer}>
                <View style={styles.pressureBar}>
                    <View style={[styles.pressureFill, {
                        width: `${buyPressure}%`,
                        backgroundColor: colors.buyPressure
                    }]} />
                    <Text style={styles.pressureText}>Buy {buyPressure}%</Text>
                </View>
                <View style={styles.pressureBar}>
                    <View style={[styles.pressureFill, {
                        width: `${sellPressure}%`,
                        backgroundColor: colors.sellPressure
                    }]} />
                    <Text style={styles.pressureText}>Sell {sellPressure}%</Text>
                </View>
            </View>
        </View>
    );
}