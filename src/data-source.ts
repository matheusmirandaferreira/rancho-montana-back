import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './models/User';
import { User1686355233019 } from './migratinos/1686355233019-User';
import { Pace } from './models/Pace';
import { Race } from './models/Race';
import { Color } from './models/Color';
import { Horse } from './models/Horse';
import { Category } from './models/Category';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: process.env.DB_CONNECTION as any,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [User, Pace, Race, Color, Category, Horse],
  migrations: [User1686355233019],
  migrationsTableName: process.env.DB_MIGRATION_TABLE_NAME,
  seeds: ['database/seeds/*{.ts,.js}'],
};

export const AppDataSource = new DataSource(options);
