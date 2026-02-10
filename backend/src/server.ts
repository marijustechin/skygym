import type { Server } from 'node:http';
import config from './config/config.js';
import app from './app.js';
import { sequelize } from './config/sequelize.js';

let server: Server | undefined;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    if (config.nodeEnv === 'development') {
      await sequelize.sync({ alter: true });
    }

    server = app.listen(config.port, () => {
      console.log(
        `SkyGym API server. Port: ${config.port} Environment: ${config.nodeEnv}`,
      );
    });
  } catch (error) {
    console.error('Startup failed:', error);
    process.exit(1);
  }
};

const shutdown = async (signal: string) => {
  console.log(`${signal} received. Shutting down...`);

  try {
    const currentServer = server;
    if (currentServer) {
      await new Promise<void>((resolve) =>
        currentServer.close(() => resolve()),
      );
    }

    await sequelize.close();
  } catch (error) {
    console.error('Shutdown error:', error);
  } finally {
    process.exit(0);
  }
};

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));

void startServer();
