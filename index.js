const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const os = require("os");
const pty = require("node-pty");
const port = process.env.PORT || 8080;

app.use(express.static('client'));

// Start a PTY.
ptyProcess = pty.spawn('/bin/bash', [], {
  name: "xterm-color",
  cwd: process.env.HOME, // Which path should terminal start
  env: process.env // Pass environment variables
});

// Any time PTY has data, send it to the socket.
ptyProcess.on("data", data => io.emit("output", data));

io.on("connection", socket => {
  console.log("Client connect to socket.", socket.id);

  // Just logging when socket disconnects.
  socket.on("disconnect", () => {
    console.log("Disconnected Socket: ", socket.id);
    // TODO: kill instance.
  });

  // Any time the socket has input, send it to PTY.
  socket.on("input", input => ptyProcess.write(input));
});

http.listen(port, () => console.log('listening on port ' + port));
