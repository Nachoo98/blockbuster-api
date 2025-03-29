import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { setupSecurity } from './security';
import { setupSwagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter, } from './common/interceptor/http.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: 422,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  setupSecurity(app);
  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();