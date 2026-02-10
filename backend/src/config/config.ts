import dotenv from 'dotenv';
dotenv.config({
  quiet: true,
});

import type { Dialect } from 'sequelize';

interface IConfig {
  port: number;
  nodeEnv: string;

  db: {
    dbName: string;
    dbUser: string;
    dbPort: number;
    dbHost: string;
    dbPass: string;
    dbDialect: Dialect;
  };

  jwt: {
    jwtAccess: string;
    jwtAccessExpires: string;
    jwtRefresh: string;
    jwtRefreshExpires: string;
    jwtReset: string; // pagalvosiu dar
  };
}

// Jei .env faile nėra pateikto aplinkos kintamojo,
// rodomas klaidos pranešimas ir programa baigia darbą
function validateEnvVar(name: string): string {
  const value = process.env[name];

  if (typeof value !== 'string' || value === '') {
    console.error(`ERROR: environment variable ${name} not defined.`);
    process.exit(1);
  }

  return value;
}

const config: IConfig = {
  port: Number(process.env.PORT) || 3003,
  nodeEnv: process.env.NODE_ENV ?? 'development',

  db: {
    dbHost: validateEnvVar('DB_HOST'),
    dbName: validateEnvVar('DB_NAME'),
    dbPass: validateEnvVar('DB_PASS'),
    dbPort: Number(validateEnvVar('DB_PORT')),
    dbUser: validateEnvVar('DB_USER'),
    dbDialect: validateEnvVar('DB_DIALECT') as Dialect,
  },

  jwt: {
    jwtAccess: validateEnvVar('JWT_ACCESS_SECRET'),
    jwtAccessExpires: validateEnvVar('JWT_ACCESS_EXPIRES'),
    jwtRefresh: validateEnvVar('JWT_REFRESH_SECRET'),
    jwtRefreshExpires: validateEnvVar('JWT_REFRESH_EXPIRES'),
    jwtReset: validateEnvVar('JWT_RESET_SECRET'),
  },
};

export default config;
