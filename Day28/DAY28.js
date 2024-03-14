const WebSocket = require('ws');

function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });
    const clients = new Map();
    wss.on('connection', (ws) => {
        const clientId = Math.random().toString(36).substring(2);
        clients.set(clientId, ws);
        ws.send('Welcome to the real-time collaborative editing tool!');
        ws.on('message', (message) => {
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(`${clientId}: ${message}`);
                }
            });
        });
        ws.on('close', () => {
            clients.delete(clientId);
        });
    });
}

module.exports = setupWebSocketServer;
