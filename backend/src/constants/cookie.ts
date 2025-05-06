export const COOKIE_NAMES = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
};

export const COOKIE_CONFIG = {
  ACCESS_TOKEN_EXPIRY: 60 * 60 * 1000, // 1 hour
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
  SAME_SITE: 'lax' as 'lax',
  SECURE: process.env.NODE_ENV === 'production',
  HTTP_ONLY: true,
};
