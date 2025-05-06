import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UnauthorizedException,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { setAuthCookies, clearAuthCookies } from '../utils/cookie.util';
import { sendSuccess } from '../utils/response.util';
import { JwtTokenService } from '../utils/jwt-token.service';
import { TokensDto } from '../utils/types/tokens.dto';
import { UserPayload } from '../utils/types/user-payload';
import { AUTH_ROUTES } from '../constants/api-paths';
import { AUTH_MESSAGES } from '../constants/messages';
import { AUTH_RESPONSE_DESCRIPTION, STATUS_CODES } from 'src/constants/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtTokenService,
  ) {}

  @Post(AUTH_ROUTES.SIGN_UP)
  @ApiBody({ type: SignupDto })
  @ApiResponse({
    status: STATUS_CODES.CREATED,
    description: AUTH_RESPONSE_DESCRIPTION.SIGN_UP_SUCCESS,
  })
  @ApiResponse({
    status: STATUS_CODES.CONFLICT,
    description: AUTH_RESPONSE_DESCRIPTION.EMAIL_EXISTS,
  })
  async signup(@Body() body: SignupDto, @Res() res: Response) {
    const { token, refreshToken }: TokensDto = await this.authService.signup(body);
    setAuthCookies(res, token, refreshToken);
    return sendSuccess(res, AUTH_MESSAGES.SIGN_UP_SUCCESS);
  }

  @Post(AUTH_ROUTES.SIGN_IN)
  @ApiBody({ type: SigninDto })
  @ApiResponse({
    status: STATUS_CODES.SUCCESS,
    description: AUTH_RESPONSE_DESCRIPTION.SIGN_IN_SUCCESS,
  })
  @ApiResponse({
    status: STATUS_CODES.UNAUTHORIZED,
    description: AUTH_RESPONSE_DESCRIPTION.INVALID_CREDENTIALS,
  })
  async signin(@Body() body: SigninDto, @Res() res: Response) {
    const result = await this.authService.signin(body);
    if (!result) {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }
    setAuthCookies(res, result.token, result.refreshToken);
    return sendSuccess(res, AUTH_MESSAGES.SIGN_IN_SUCCESS);
  }

  @Post(AUTH_ROUTES.SIGN_OUT)
  @ApiResponse({
    status: STATUS_CODES.SUCCESS,
    description: AUTH_RESPONSE_DESCRIPTION.SIGN_OUT_SUCCESS,
  })
  async logout(@Res() res: Response) {
    clearAuthCookies(res);
    return sendSuccess(res, AUTH_MESSAGES.SIGN_OUT_SUCCESS);
  }

  @Post(AUTH_ROUTES.REFRESH)
  @ApiResponse({
    status: STATUS_CODES.SUCCESS,
    description: AUTH_RESPONSE_DESCRIPTION.REFRESH_SUCCESS,
  })
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException(AUTH_MESSAGES.NO_REFRESH_TOKEN);
    }

    try {
      const payload = this.jwtService.verifyRefreshToken(refreshToken) as UserPayload;
      const { token } = this.jwtService.generateTokens(payload);
      setAuthCookies(res, token, refreshToken);
      return sendSuccess(res, AUTH_MESSAGES.REFRESH_SUCCESS, { token });
    } catch (err) {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_REFRESH_TOKEN);
    }
  }

  @Get(AUTH_ROUTES.USER)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: STATUS_CODES.SUCCESS, description: AUTH_RESPONSE_DESCRIPTION.USER })
  getMe(@Req() req: Request) {
    return req.user;
  }
}
