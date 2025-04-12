import 'reflect-metadata';
import { useContainer } from 'routing-controllers';
import express from 'express';
import { useExpressServer } from 'routing-controllers';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as controllers from './common/controller-index';
import { Container } from 'typedi';
import { connectMysql, AppDataSource } from './database/connection';
import { authorizationChecker } from './auth/authorizationChecker';
import path from 'path';
import { CustomErrorHandler } from './auth/errorHandler';
useContainer(Container);
// dotenv.config();
// const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
// dotenv.config({ path: envFile });
// console.log(process.env.TYPEORM_HOST, 'bbbbbbbbbbbb');

const PORT = process.env.PORT || 8000;
const fileExtension = process.env.NODE_ENV === 'production' ? 'js' : 'ts';
connectMysql()
  .then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');

      if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // ✅ Important for preflight
      }

      next();
    });
    app.use(cookieParser()); // ✅ Use cookie-parser
    app.get('/api/test', (req, res) => res.json({ test: 'OK' }));
    useExpressServer(app, {
      // controllers: Object.values(controllers),
      controllers: [path.join(__dirname, `/controllers/**/*.js`)],
      // controllers: [path.join(__dirname, `/controllers/**/*.${fileExtension}`)],

      routePrefix: '/api',
      cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],

        credentials: true,
      },
      middlewares: [CustomErrorHandler],
      authorizationChecker: authorizationChecker(),
      defaultErrorHandler: false, // ✅ This will send proper error messages
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB Connection Failed:', err);
    process.exit(1); // Exit process if DB connection fails
  });
