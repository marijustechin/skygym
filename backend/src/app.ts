import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorMiddleware from './shared/middlewares/error.middleware.js';
import authRoutes from './modules/auth/auth.routes.js';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173', 'https://www.skygym.lt'],
  }),
);

app.use(express.json());
app.use(cookieParser());

// Routers
app.use('/api/v1/auth', authRoutes);

// Būtinai paskutinis
app.use(errorMiddleware);

export default app;
