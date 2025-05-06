import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_CONSTANTS } from 'src/constants/jwt.constants';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(userId: string) {
    return this.jwtService.sign(
      { sub: userId },
      { secret: JWT_CONSTANTS.ACCESS_TOKEN_SECRET, expiresIn: JWT_CONSTANTS.ACCESS_TOKEN_EXPIRY },
    );
  }

  generateRefreshToken(userId: string) {
    return this.jwtService.sign(
      { sub: userId },
      { secret: JWT_CONSTANTS.REFRESH_TOKEN_SECRET, expiresIn: JWT_CONSTANTS.REFRESH_TOKEN_EXPIRY },
    );
  }
}
