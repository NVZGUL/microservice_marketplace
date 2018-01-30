import http from 'http';
import app from './server/app';

const debug = require('debug')('server:server');

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) { return val; }
  if (port >= 0) { return port; }
  return false;
}


const port = normalizePort(process.env.PORT || '3050');
app.set('port', port);

const server = http.createServer(app);

function onError(err) {
  if (err.syscall !== 'listen') { throw err; }
  switch (err.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
    default:
      throw err;
  }
}

function onListening() {
  const adr = server.address();
  const bind = typeof adr === 'string' ? `Pipe ${port}` : `Port ${port}`;
  debug(`Listening on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);