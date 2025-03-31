import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const allowedCors = (process.env.ALLOWED_CORS as string).split(',');
export const setupSecurity = (app: INestApplication): void => {
  app.use(helmet());

  app.enableCors({
    origin: allowedCors,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000,
      max: Number(process.env.REQUEST_LIMIT),
      message: 'Too many requests',
    }),
  );
};
