import { Injectable, ConflictException } from '@nestjs/common';

import { UserRepository } from '../repositories/user.repository';
import { JwtTokenService } from '../utils/jwt-token.service';
import { PasswordService } from '../utils/password.service';
import { AuditLogger } from '../utils/audit-logger.service';
import { AUTH_MESSAGES } from 'src/constants/messages';
import { AUDIT_EVENT_NAMES } from 'src/constants/audit-event';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtTokenService,
    private passwordService: PasswordService,
    private audit: AuditLogger,
  ) {}

  async signup(body: any) {
    const { email, name, password } = body;
    const hashedPassword = await this.passwordService.hashPassword(password);

    try {
      const user = await this.userRepo.create({ email, name, password: hashedPassword });

      const token = this.jwtService.generateAccessToken({
        sub: user._id,
        name: user.name,
        email: user.email,
      });
      const refreshToken = this.jwtService.generateRefreshToken({
        sub: user._id,
        name: user.name,
        email: user.email,
      });

      this.audit.logEvent(AUDIT_EVENT_NAMES.SIGN_UP, email);
      return { token, refreshToken };
    } catch (err: any) {
      if (err?.code === 11000 && err?.keyPattern?.email) {
        throw new ConflictException(AUTH_MESSAGES.EMAIL_EXISTS);
      }
      throw err;
    }
  }

  async signin(body: any): Promise<{ token: string; refreshToken: string } | null> {
    const { email, password } = body;
    const user = await this.userRepo.findByEmail(email);
    if (user && (await this.passwordService.comparePasswords(password, user.password))) {
      const token = this.jwtService.generateAccessToken({
        sub: user._id,
        name: user.name,
        email: user.email,
      });
      const refreshToken = this.jwtService.generateRefreshToken({
        sub: user._id,
        name: user.name,
        email: user.email,
      });
      this.audit.logEvent(AUDIT_EVENT_NAMES.SIGN_IN, email);
      return { token, refreshToken };
    }
    return null;
  }
}
