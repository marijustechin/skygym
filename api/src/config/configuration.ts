const parseEnvArray = (value?: string): string[] => {
  if (!value) return [];

  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
};

const parseEnvBoolean = (value?: string): boolean => value === 'true';

export const appConfig = () => ({
  env: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3003),

  app: {
    frontendUrl: process.env.FRONTEND_URL,
  },

  cors: {
    origins: parseEnvArray(process.env.CORS_ORIGINS),
  },

  swagger: {
    enabled: parseEnvBoolean(process.env.SWAGGER_ENABLED),
  },

  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
    sync: parseEnvBoolean(process.env.DB_SYNC),
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },

  mail: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    secure: parseEnvBoolean(process.env.MAIL_SECURE),
  },

  contact: {
    toEmail: parseEnvArray(process.env.CONTACT_TO_EMAIL),
  },

  turnstile: {
    secretKey: process.env.TURNSTILE_SECRET_KEY,
  },
});

export type AppConfig = ReturnType<typeof appConfig>;
