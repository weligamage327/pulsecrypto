import { TradingPair } from '../types';
import { config } from '../config/api';

class ApiService {
    async getPairsMeta(): Promise<TradingPair[]> {
        try {
            const response = await fetch(`${config.API_URL}/pairs/meta`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                return data.data;
            } else {
                throw new Error('Failed to fetch pairs metadata');
            }
        } catch (error) {
            console.error('[API] Error fetching pairs:', error);
            throw error;
        }
    }

    async checkHealth(): Promise<boolean> {
        try {
            const response = await fetch(`${config.API_URL}/health`);
            const data = await response.json();
            return data.status === 'ok';
        } catch (error) {
            console.error('[API] Health check failed:', error);
            return false;
        }
    }
}

export const apiService = new ApiService();