import express from 'express';
import compression from 'compression';
import corsMiddleware from './middlewares/http/corsMiddleware.js';
import { limiterMiddleware } from './middlewares/http/limiterMiddleware.js';
import loadRoutes from './utils/routesLoader/loadRoutes.js';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
import statusMonitor from 'express-status-monitor';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const accessLogStream = fs.createWriteStream(path.join('logs', 'access.log'), {
  flags: 'a',
});

app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));

// if (process.env.NODE_ENV === 'production') {
//   app.use('/', limiterMiddleware);
// }

app.use(helmet());
app.use(hpp());
app.use(corsMiddleware);
app.use(statusMonitor());
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const frontendDir = path.resolve(__dirname, '../frontend/dist');
app.use(express.static(frontendDir));

const routes = await loadRoutes();
routes.forEach(({ router }) => {
  app.use(router);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Внутренняя ошибка сервера',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ресурс не найден' });
});

export default app;
