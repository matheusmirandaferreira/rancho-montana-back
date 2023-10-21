"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./models/User");
const _1686355233019_User_1 = require("./migratinos/1686355233019-User");
const Pace_1 = require("./models/Pace");
const Race_1 = require("./models/Race");
const Color_1 = require("./models/Color");
const Horse_1 = require("./models/Horse");
const Category_1 = require("./models/Category");
const options = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    entities: [User_1.User, Pace_1.Pace, Race_1.Race, Color_1.Color, Category_1.Category, Horse_1.Horse],
    migrations: [_1686355233019_User_1.User1686355233019],
    migrationsTableName: process.env.DB_MIGRATION_TABLE_NAME,
    seeds: ['database/seeds/*{.ts,.js}'],
};
exports.AppDataSource = new typeorm_1.DataSource(options);
