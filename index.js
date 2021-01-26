const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const os = require('os');
const pty = require('node-pty');
const port = process.env.PORT || 8080;

// Serve static content from client/
app.use(express.static('client'));

// Collect all ongoing PTYs.
var ptys = {};

// Stop on ctrl+C
process.on('SIGINT', () => {
  console.log('sigint'); // TODO remove

  // Kill all PTYs.
  for (var id in ptys) {
    ptys[id].kill();
    console.log('killed', id);
  }

  // Exit.
  process.exit();
});

io.on('connection', socket => {
  console.log('connected socket', socket.id);

  // Start a PTY.
  const ptyProcess = pty.spawn('/bin/bash', [], {
    name: 'xterm-color',
    cwd: process.env.HOME, // Which path should terminal start
    env: process.env // Pass environment variables
  });
  ptys[socket.id] = ptyProcess;

  // Any time PTY has data, send it to the socket.
  ptyProcess.on('data', data => socket.emit('output', data));

  // Any time the socket has input, send it to PTY.
  socket.on('input', input => ptys[socket.id].write(input));

  // Any time the socket disconnects, log it, and kill the PTY.
  socket.on('disconnect', () => {
    console.log('disconnected socket', socket.id);
    ptys[socket.id].kill();
    delete ptys[socket.id];
  });

  // When the PTY exits, close the socket.
  ptyProcess.on('exit', () => socket.disconnect());
});

http.listen(port, () => console.log('listening on port ' + port));
