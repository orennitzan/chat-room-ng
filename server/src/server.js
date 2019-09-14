const express = require('express')
const app = express();

const http = require('http');
const server = http.Server(app);
const logger = require("./logger.js").getLogger();
const config = require("./../config");

const socketIO = require('socket.io');
const io = socketIO(server);

const port = process.env.PORT || config.port;

io.on('connection', (socket) => {
    logger.debug('user connected');

    socket.on('client-message', (message) => {
        logger.debug(message);
        io.emit('server-message', message);
    });
});

server.listen(port, () => {
    logger.info(`started on port: ${port}`);
});