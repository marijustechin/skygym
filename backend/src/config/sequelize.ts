import { Sequelize } from 'sequelize-typescript';
import config from './config.js';
// Models
import { User } from '../modules/user/user.model.js';

export const sequelize = new Sequelize({
  host: config.db.dbHost,
  database: config.db.dbName,
  username: config.db.dbUser,
  password: config.db.dbPass,
  port: config.db.dbPort,
  dialect: config.db.dbDialect,
  models: [User],
});
