// server.js (or similar)
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { // Configure CORS for your Next.js app
        origin: "http://localhost:3000", // Replace with your Next.js URL
        methods: ["GET", "POST"]
    }
});
const port = process.env.PORT || 8080;

let sharedDocument = {}; // Store the shared document state

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId); // Join a room (for different documents)

        // Send the current document state to the newly joined client
        io.to(roomId).emit('documentUpdate', sharedDocument[roomId] || {});
    });

    socket.on('editorChange', (roomId, data) => {
        sharedDocument[roomId] = data; // Update the shared document

        // Broadcast the changes to all other clients in the same room
        socket.to(roomId).emit('documentUpdate', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});