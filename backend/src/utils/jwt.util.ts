import * as jwt from 'jsonwebtoken';

import { TOKEN_EXPIRY } from '../constants/config';

export function generateAccessToken(payload: any): string {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRY.ACCESS });
}

export function generateRefreshToken(payload: any): string {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: TOKEN_EXPIRY.REFRESH });
}

export function verifyRefreshToken(token: string): any {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}
