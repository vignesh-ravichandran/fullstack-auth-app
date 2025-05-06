import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { UserPayload } from './types/user-payload';

@Injectable()
export class JwtTokenService {
  generateAccessToken(payload: UserPayload): string {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {});
  }

  generateRefreshToken(payload: UserPayload): string {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {});
  }

  generateTokens(payload: UserPayload): { token: string; refreshToken: string } {
    return {
      token: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  verifyRefreshToken(token: string): any {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
  }

  verifyAccessToken(token: string): any {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  }
}
