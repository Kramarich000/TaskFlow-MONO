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
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: [
        "'self'",
        'https://taskflow-mono.onrender.com',
        'https://taskflow-api-gavu.onrender.com',
        'http://localhost:8080',
      ],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      imgSrc: ["'self'", 'data:'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'], // добавлено разрешение для data URI
    },
  }),
);

const accessLogStream = fs.createWriteStream(path.join('logs', 'access.log'), {
  flags: 'a',
});

app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));

// if (process.env.NODE_ENV === 'production') {
//   app.use('/', limiterMiddleware);
// }

app.use(hpp());
app.use(statusMonitor());
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const frontendDir = path.resolve(__dirname, '../frontend/dist');
app.use(express.static(frontendDir));

const routes = await loadRoutes();
routes.forEach(({ path: routePath, router }) => {
  if (routePath.startsWith('/api')) {
    app.use(routePath, corsMiddleware, router);
  } else {
    app.use(routePath, router);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Внутренняя ошибка сервера',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

export default app;
