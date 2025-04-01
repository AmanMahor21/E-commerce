import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as entit from '../common/entities-index';
import * as migrations from '../common/migrations-index';
import { useContainer } from 'typeorm';
import Container from 'typedi';
import * as path from 'path';

// useContainer(Container);

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'spurtuser',
  password: 'SpurtUser@123456',
  database: 'spurt_commerce',
  synchronize: false,
  logging: false,
  subscribers: [],
  entities: [path.join(__dirname, '/../models/*.ts')],
  // migrations: Object.values(migrations),

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
