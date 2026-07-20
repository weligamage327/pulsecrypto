# PulseCrypto - Real-Time Cryptocurrency Market Viewer

*Built with Node.js, Express, WebSocket, React Native, and Expo SDK 54.*

A real-time cryptocurrency market viewer consisting of a Node.js backend that ingests live market data from Binance and a React Native mobile application that visualizes the processed data in real time.

## Architecture Overview
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Binance API   │────▶│  Node.js Backend │────▶│  React Native   │
│  (WebSocket)    │     │  (Port 3001)     │     │  Mobile App     │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                              │
                        ┌─────┴─────┐
                        │  REST API │
                        │ /pairs/meta│
                        └───────────┘

## Project Structure
pulse-crypto/
├── backend/                    # Node.js backend
│   └── src/
│       ├── config/            # Configuration
│       ├── types/             # TypeScript interfaces
│       ├── data/              # Mock data
│       ├── services/          # Business logic
│       ├── gateways/          # WebSocket server
│       ├── routes/            # REST API routes
│       └── utils/             # Utility functions
├── mobile/                    # React Native (Expo) app
│   └── src/
│       ├── app/               # Screens (Expo Router)
│       ├── components/        # Reusable UI components
│       ├── hooks/             # Custom React hooks
│       ├── services/          # API & WebSocket clients
│       ├── config/            # App configuration
│       ├── types/             # TypeScript interfaces
│       └── utils/             # Utilities & theme
└── README.md

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm 9+
- Expo Go app with **SDK 54** support (iOS/Android)
- Physical device or emulator for testing

### Backend Setup

```bash
cd backend
npm install
npm run dev

The server starts on:

REST API: http://localhost:3001

WebSocket: ws://localhost:3001/ws

Monitoring: 5 trading pairs (BTC, ETH, SOL, DOGE, XRP)
```

## Mobile Setup
```bash
cd mobile
npm install
```

### Configure Backend URL
- Edit src/config/api.ts and set your computer's local IP address:
```typescript
const getLocalIP = (): string => {
  if (__DEV__) {
    return '192.168.8.111'; // Replace with your Mac's IP
  }
  return 'api.yourserver.com';
};
```

### Find your IP address:
```bash
ipconfig getifaddr en0
```

### Start the App
```bash
npx expo start
```

Scan the QR code with Expo Go app on your device.

### SDK Version Compatibility

| Component     |   Version   |
| -----------   | ----------- |
| Expo SDK      |   54        |
| React Native  |   0.74      |
| TypeScript    |   5.x       |


If you encounter version mismatches:
```bash
npx expo install --fix
```

## Features

### Backend
- Real-time connection to Binance public WebSocket streams
- Stream buffering and processing every 100ms (configurable)
- Live order book management for 5 trading pairs
- WebSocket server broadcasting to mobile clients
- REST API for trading pair metadata (mocked)
- Automatic reconnection with exponential backoff
- Client heartbeat monitoring and cleanup

### Mobile App
- Live watchlist with real-time price updates
- Green/red indicators for price changes
- Market detail screen with order book visualization
- Buy/Sell pressure indicators
- Search with debounce (300ms)
- Favorites filter and persistent storage (AsyncStorage)
- Pull-to-refresh metadata
- Connection status indicator (Live/Disconnected)
- Auto-reconnect on app foreground
- Offline support (shows last known data)
- Consistent dark theme with centralized colors

## Trading Pairs

| Pair      | Base    | Quote   |
|-----------|---------|---------|
| BTCUSDT   | Bitcoin | Tether  |
| ETHUSDT   | Ethereum| Tether  |
| SOLUSDT   | Solana  | Tether  |
| DOGEUSDT  | Dogecoin| Tether  |
| XRPUSDT   | XRP     | Tether  |


## API Documentation

### REST Endpoints

GET /pairs/meta
Returns metadata for all supported trading pairs.

# Response:
```json
{
  "success": true,
  "data": [
    {
      "symbol": "BTCUSDT",
      "baseAsset": "BTC",
      "quoteAsset": "USDT",
      "displayName": "Bitcoin / Tether",
      "status": "TRADING",
      "high24h": 110500,
      "low24h": 107200,
      "volume24h": 28500000000,
      "change24h": 1.82
    }
  ],
  "timestamp": 1784442786758
}
```

## Architecture Decisions

### Buffer Strategy
Updates from Binance arrive at high frequency. The StreamProcessor buffers these updates and processes them every 100ms (configurable via `BUFFER_INTERVAL_MS`). This approach:
- Reduces processing overhead
- Provides consistent emission intervals for clients
- Prevents unbounded memory growth with configurable `MAX_BUFFER_SIZE`
- Discards oldest updates when buffer is full

### WebSocket Connection Order
Mobile app connects WebSocket AFTER metadata loads to prevent race conditions where market updates arrive before pair data is initialized in the state.

### State Management
Used React's `useState` with plain arrays for market data instead of Maps or external libraries. This ensures proper React re-rendering and simplifies the component tree.

### Modular Architecture
- **Backend:** Layered architecture separating services, gateways, routes, and utilities
- **Mobile:** Feature-based components with co-located styles for scalability
- Pure utility functions extracted for testability and reuse

### Component Design
Each UI component has its styles co-located (e.g., `PairRow.tsx` + `PairRow.styles.ts`). This keeps components self-contained and scalable for larger projects.

## Assumptions Made
- **Mock metadata:** 24h stats use mock data as allowed by requirements
- **Public streams:** Binance WebSocket streams don't require authentication
- **Combined streams:** Single WebSocket connection handles all pairs efficiently
- **Top 10 levels:** Displaying top 10 bid/ask levels is sufficient for the UI
- **100ms interval:** Provides good balance between responsiveness and performance
- **Single device:** App tested on iOS physical device with Expo Go

## Trade-offs Considered

|           Decision               |                     Trade-off                               |
| -------------------------------  |-------------------------------------------------------------|
| Mock metadata vs real API        | Simpler implementation; Acceptable per requirements         |
| Array vs Map for state           | Better React compatibility; Slightly less efficient lookups |
| Expo vs bare React Native        | Faster development; Less native module control              |
| No state library (Redux/Zustand) | Simpler for this scale; Would need at larger size           |
| Single WebSocket connection.     | Efficient; Can't selectively subscribe to pairs             |
| Inline vs extracted styles       | Extracted for screens; Inline for small components          |
| Debounce on search               | 300ms delay; Smoother UX with live filtering                |

## How AI-Assisted Development Was Used
AI tools (Antigravity, DeepSeek, Gemini) were used throughout development for:
- Architecture planning and component tree design
- Initial code generation for services, hooks, and components
- Debugging WebSocket connection and state management issues
- Refactoring to improve modularity and maintainability
- Extracting utility functions and organizing code structure
- README and documentation generation

All AI-generated code was reviewed, tested, and refined to ensure correctness, performance, and alignment with the assignment requirements.

## Running in Production
For production deployment, consider:
- Replace mock data with Binance REST API for live 24h stats
- Implement WebSocket authentication
- Add rate limiting and proper CORS configuration
- Use environment variables for all configuration
- Set up error monitoring and logging
- Configure CI/CD for both applications
- Build native apps with EAS Build for App Store/Play Store
