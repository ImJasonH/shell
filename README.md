# Cloud Run Interactive Shell

This runs a server in Cloud Run which serves an interactive shell in the
browser using [XTerm.js](https://xtermjs.org) and
[socket.io](https://socket.io). Each instance can only be used by one client at
a time.

This is not secure, or even a good idea.

* This is based on https://github.com/saisandeepvaddi/how-to-create-web-terminals
