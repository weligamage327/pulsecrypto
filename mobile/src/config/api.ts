import { Platform } from 'react-native';

// Get the local IP based on platform
const getLocalIP = (): string => {
    if (__DEV__) {
        // For development - change this to your Mac's IP
        return '192.168.8.111';
    }
    // For production - use actual server URL
    return 'api.yourserver.com';
};

const API_HOST = getLocalIP();
const API_PORT = '3001';

export const config = {
    API_URL: `http://${API_HOST}:${API_PORT}`,
    WS_URL: `ws://${API_HOST}:${API_PORT}/ws`,
};