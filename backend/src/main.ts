import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { Logger } from './common/logger/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });

  // Apply security headers
  app.use(helmet());

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Enable cookie parsing
  app.use(cookieParser());

  // Enable CSRF protection only in production
  if (process.env.NODE_ENV === 'production') {
    const csrfProtection = csurf({ cookie: { httpOnly: true, sameSite: 'lax' } });

    app.use((req, res, next) => {
      const exemptPaths = ['/api', '/docs', '/docs-json', '/swagger', '/health'];
      const isExempt = exemptPaths.some(path => req.path.startsWith(path));
      if (isExempt) {
        return next();
      }
      return csrfProtection(req, res, next);
    });
  }

  // Global error handler
  app.useGlobalFilters(new AllExceptionsFilter());

  // Enable Cors
  app.enableCors({
    credentials: true,
    origin: process.env.FE_ORIGIN,
  });

  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription(
      'This API handles user authentication and session management using JWT and refresh tokens.\n\n' +
        'Includes signup, login, logout, token refresh, and protected user info endpoints.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
