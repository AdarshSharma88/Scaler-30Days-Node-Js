const express = require('express');
const http = require('http');
const setupWebSocketServer = require('./DAY28.js');

const app = express();
const server = http.createServer(app);
setupWebSocketServer(server);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
