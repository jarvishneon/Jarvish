const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('device-data', (data) => {
    io.emit('show-data', data);
  });
});

const PORT = process.env.PORT || 10000;
http.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
