import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),

  PORT: Joi.number().integer().positive().default(3003),

  // CORS
  // leidžiam tuščią (pvz. jei CORS išvis nereikalingas),
  // bet jei įrašyta — turi būti tvarkingas stringas
  CORS_ORIGINS: Joi.string().allow('').default(''),

  // Swagger toggle
  SWAGGER_ENABLED: Joi.boolean().truthy('true').falsy('false').default(false),

  // DB
  DB_HOST: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_PORT: Joi.number().integer().positive().required(),

  // JWT
  JWT_ACCESS_SECRET: Joi.string().min(16).required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().min(16).required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().required(),
});
