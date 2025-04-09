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

console.log(process.env.TYPEORM_CONNECTION, 'nnnnnnnn');
export const AppDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION as any, // or as 'mysql' if you know it's mysql
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT || '3306'),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  logging: false,
  subscribers: [],
  entities: [path.join(__dirname, '/../models/*.ts')],
  migrations: Object.values(migrations),
  extra: {
    connectTimeout: 30000, // 30 seconds
  },

  // entities: Object.values(entit) as Function[], // Ensure entities are correctly loaded
});

export const connectMysql = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log(AppDataSource.isInitialized, 'jjjjjjjjjjjj');
    // Object.values(entit).forEach(entity => {
    //   Container.set({
    //     id: `Repository<${entity.name}>`,
    //     value: AppDataSource.getRepository(entity),
    //   });
    // });

    console.log('DB connected');
  } catch (err) {
    console.error('DB Connection Error:', err);
  }
};
