import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as entit from '../common/entities-index';
import * as migrations from '../common/migrations-index';
import { useContainer } from 'typeorm';
import Container from 'typedi';
import * as dotenv from 'dotenv';
import * as path from 'path';
// dotenv.config();
// useContainer(Container);
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

export const AppDataSource = new DataSource({
  type: 'mysql', // or as 'mysql' if you know it's mysql
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT || '3306'),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  logging: false,
  subscribers: [],
  driver: require('mysql2'), // Add this line
  entities: [path.join(__dirname, '/../models/*.js')],
  // entities: [path.join(__dirname, '/../models/*.ts')],
  migrations: Object.values(migrations),
  extra: {
    ssl: {
      rejectUnauthorized: false, // uses system CA
    },
  },
});

export const connectMysql = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('DB connected');
  } catch (err) {
    console.error('DB Connection Error:', err);
  }
};
