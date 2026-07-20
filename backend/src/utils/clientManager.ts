import { WebSocket } from 'ws';

export interface ClientInfo {
    ws: WebSocket;
    connectedAt: number;
    lastActivity: number;
    subscribedPairs: Set<string>;
}

export function createClientInfo(ws: WebSocket): ClientInfo {
    return {
        ws,
        connectedAt: Date.now(),
        lastActivity: Date.now(),
        subscribedPairs: new Set(),
    };
}

export function startHeartbeat(
    clients: Map<WebSocket, ClientInfo>,
    timeoutMs: number,
    intervalMs: number
): NodeJS.Timeout {
    return setInterval(() => {
        clients.forEach((info, ws) => {
            if (Date.now() - info.lastActivity > timeoutMs) {
                console.log('[Heartbeat] Terminating inactive client');
                ws.terminate();
                clients.delete(ws);
            } else {
                ws.ping();
            }
        });
    }, intervalMs);
}

export function handleClientMessage(
    data: Buffer,
    clientInfo: ClientInfo
): void {
    const message = JSON.parse(data.toString());
    clientInfo.lastActivity = Date.now();

    if (message.type === 'subscribe' && message.pairs) {
        clientInfo.subscribedPairs = new Set(message.pairs);
    }
}

export function shouldSendToClient(
    clientInfo: ClientInfo,
    pair: string
): boolean {
    return clientInfo.subscribedPairs.size === 0 ||
        clientInfo.subscribedPairs.has(pair);
}