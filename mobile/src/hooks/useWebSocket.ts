import { useState, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { MarketUpdate } from '../types';
import { wsService } from '../services/websocket.service';

export function useWebSocket(onUpdate: (update: MarketUpdate) => void) {
    const [isConnected, setIsConnected] = useState(false);
    const setupRef = useRef(false);
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        if (!setupRef.current) {
            wsService.setOnMarketUpdate(onUpdate);
            wsService.setOnConnectionChange((connected: boolean) => {
                console.log('[WebSocket] Connection:', connected); // Debug
                setIsConnected(connected);
            });
            wsService.connect();
            setupRef.current = true;
        }

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, []);

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
            if (!wsService.getConnectionStatus()) {
                wsService.connect();
            }
        }
        appState.current = nextAppState;
    };

    // Check connection status periodically
    useEffect(() => {
        const interval = setInterval(() => {
            const connected = wsService.getConnectionStatus();
            if (connected !== isConnected) {
                setIsConnected(connected);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isConnected]);

    return { isConnected };
}