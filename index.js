const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const os = require('os');
const pty = require('node-pty');
const port = process.env.PORT || 8080;

// Serve static content from client/
app.use(express.static('client'));

io.on('connection', socket => {
  console.log('connected socket', socket.id);

  // Start a PTY.
  ptyProcess = pty.spawn('/bin/bash', [], {
    name: 'xterm-color',
    cwd: process.env.HOME, // Which path should terminal start
    env: process.env // Pass environment variables
  });

  // Any time PTY has data, send it to the socket.
  ptyProcess.on('data', data => io.emit('output', data));

  // Any time the socket has input, send it to PTY.
  socket.on('input', input => ptyProcess.write(input));

  // Any time the socket disconnects, log it.
  socket.on('disconnect', () => {
    console.log('disconnected socket', socket.id);
  });
});

http.listen(port, () => console.log('listening on port ' + port));
