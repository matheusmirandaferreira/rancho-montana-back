import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './models/User';
import { User1686355233019 } from './migratinos/1686355233019-User';
import { Pace } from './models/Pace';
import { Race } from './models/Race';
import { Color } from './models/Color';
import { Horse } from './models/Horse';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'password',
  database: 'db',
  synchronize: true,
  entities: [User, Pace, Race, Color, Horse],
  migrations: [User1686355233019],
  migrationsTableName: 'migration_table',
});
