import { Router, Request, Response } from 'express';
import { mockPairs } from '../data/mockPairs';

const router = Router();

router.get('/meta', (req: Request, res: Response) => {
    try {
        res.json({
            success: true,
            data: mockPairs,
            timestamp: Date.now()
        });
    } catch (error) {
        console.error('[PairsRoute] Error fetching pairs:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch trading pairs'
        });
    }
});

export default router;