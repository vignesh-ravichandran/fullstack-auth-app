import { Response } from 'express';
import { COOKIE_NAMES, COOKIE_CONFIG } from 'src/constants/cookie';

const defaultCookieOptions = {
  httpOnly: COOKIE_CONFIG.HTTP_ONLY,
  secure: COOKIE_CONFIG.SECURE,
  sameSite: COOKIE_CONFIG.SAME_SITE,
};

export function setAuthCookies(res: Response, token: string, refreshToken: string) {
  res.cookie(COOKIE_NAMES.TOKEN, token, {
    ...defaultCookieOptions,
    maxAge: COOKIE_CONFIG.ACCESS_TOKEN_EXPIRY,
  });

  res.cookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
    ...defaultCookieOptions,
    maxAge: COOKIE_CONFIG.REFRESH_TOKEN_EXPIRY,
  });
}

export function clearAuthCookies(res: Response) {
  [COOKIE_NAMES.TOKEN, COOKIE_NAMES.REFRESH_TOKEN].forEach(name =>
    res.clearCookie(name, defaultCookieOptions),
  );
}
