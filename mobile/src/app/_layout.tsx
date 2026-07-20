import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../utils/colors';

export default function RootLayout() {
    return (
        <>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: colors.surface,
                    },
                    headerTintColor: colors.textPrimary,
                    headerTitleStyle: {
                        fontWeight: '600',
                    },
                    contentStyle: {
                        backgroundColor: colors.background,
                    },
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        title: 'PulseCrypto',
                        headerTitleStyle: {
                            color: colors.accent,
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="market/[pair]"
                    options={{
                        title: 'Market Details',
                    }}
                />
            </Stack>
        </>
    );
}