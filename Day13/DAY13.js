const express = require("express");
const app = express();
const path = require('path');
const httpServer = require('http').createServer(app);
const WebSocket = require('ws');

const PORT = 3000;

// WebSocket server setup
const wss = new WebSocket.Server({ server: httpServer });

wss.on('connection', function connection(ws) {
    console.log("New client connected");

    // Send a welcome message to the client
    ws.send('Welcome, new client!');

    ws.on('error', console.error);

    ws.on('message', function incoming(message) {
        console.log('Received: %s', message);
        // Echo back the received message
        ws.send("Echo: " + message);
    });
});

// Serve HTML page for WebSocket connection
app.get('/websocket', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
httpServer.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
