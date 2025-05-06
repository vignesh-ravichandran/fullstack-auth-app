import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { JwtTokenService } from '../utils/jwt-token.service';
import { PasswordService } from '../utils/password.service';
import { AuditLogger } from '../utils/audit-logger.service';
import { Logger } from '../common/logger/logger';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: userSchema }])],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtTokenService, PasswordService, AuditLogger, Logger],
})
export class AuthModule {}
