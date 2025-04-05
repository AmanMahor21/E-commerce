import 'reflect-metadata';
import { useContainer } from 'routing-controllers';
import express from 'express';
import { useExpressServer } from 'routing-controllers';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as controllers from './common/controller-index';
import { Container } from 'typedi';
import { authorizationChecker } from './auth/authorizationChecker';
import { connectMysql, AppDataSource } from './database/connection';
import path from 'path';
import { CustomErrorHandler } from './auth/errorHandler';
useContainer(Container);
dotenv.config();

const PORT = process.env.PORT || 8000;

console.log(controllers, 'direct controllers');

connectMysql()
  // AppDataSource.initialize()
  .then(() => {
    const app = express();
    console.log('✅ DB Connected Successfully');
    app.use(bodyParser.json());
    app.use(cookieParser()); // ✅ Use cookie-parser
    app.get('/api/test', (req, res) => res.json({ test: 'OK' }));
    console.log(Object.values(controllers), 'kk');

    useExpressServer(app, {
      // controllers: Object.values(controllers),
      controllers: [path.join(__dirname, '/controllers/**/*.ts')],

      routePrefix: '/api',
      cors: {
        origin: process.env.TASTEZY_FRONTEND_URL,
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
// import 'reflect-metadata'; // MUST BE FIRST IMPORT
// import { useExpressServer, useContainer as routingUseContainer } from 'routing-controllers';
// import express from 'express';
// import { useContainer as ormUseContainer } from 'typeorm';
// import { Container } from 'typedi';
// import bodyParser from 'body-parser';
// import * as dotenv from 'dotenv';
// import path from 'path';
// import { CartProductController } from './controllers/CartController';
// import { AppDataSource } from './database/connection';

// // 1. Load environment variables FIRST
// dotenv.config();

// // 2. Configure DI containers EARLY
// routingUseContainer(Container);
// // ormUseContainer(Container);

// const app = express();
// const PORT = process.env.PORT || 8000;

// async function bootstrap() {
//   // 3. Initialize database connection BEFORE controllers
//   try {
//     await AppDataSource.initialize();
//     console.log('✅ Database connected');
//   } catch (err) {
//     console.error('❌ Database connection failed:', err);
//     process.exit(1);
//   }

//   // 4. Configure express middleware
//   app.use(bodyParser.json());
//   app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

//   // 5. Setup routing-controllers AFTER DB is ready
//   useExpressServer(app, {
//     controllers: [CartProductController], // Use .js for compiled files
//     // controllers: [path.join(__dirname, '/controllers/**/*.js')], // Use .js for compiled files
//     routePrefix: '/api',
//     cors: {
//       origin: process.env.TASTEZY_FRONTEND_URL,
//       methods: ['GET', 'POST', 'PUT', 'DELETE'],
//       allowedHeaders: ['Content-Type', 'Authorization'],
//       credentials: true,
//     },
//     // authorizationChecker: authorizationChecker(),
//     defaultErrorHandler: true,
//     development: true, // Shows more debug info
//   });

//   // 6. Start server
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
//   });
// }

// bootstrap().catch((err) => {
//   console.error('💀 Application startup failed:', err);
//   process.exit(1);
// });
