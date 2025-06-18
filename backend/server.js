import http from 'http';
import app from './app.js';
import 'dotenv/config';

import { initSocket } from './socket/index.js';

if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  console.warn = () => {};
}

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Сервер запущен на порту ${PORT} (HTTP + WebSocket)`);
});
