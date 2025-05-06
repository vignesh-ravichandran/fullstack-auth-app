import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().uri().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        NODE_ENV: Joi.string().valid('development', 'production').default('development'),
        PORT: Joi.number().default(3000),
      }),
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    AuthModule,
    HealthModule,
  ],
})
export class AppModule {}
