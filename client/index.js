const socket = io();
const terminal = new Terminal();
terminal.setOption('theme', {
  background: '#202B33',
  foreground: '#F5F8FA'
});
terminal.open(document.getElementById('container'));

// When the terminal has data, send it to the socket.
terminal.onData(data => socket.emit('input', data));

// When the socket has data, send it to the terminal.
socket.on('output', data => terminal.write(data));
