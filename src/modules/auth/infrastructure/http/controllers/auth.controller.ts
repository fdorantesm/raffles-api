import { JwtGuard } from './../../../application/guards/jwt.guard';
import { ConfigService } from '@nestjs/config';
import { CookieGuard } from './../../../application/guards/cookie.guard';
import * as cookie from 'cookie';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  VERSION_NEUTRAL,
  Res,
} from '@nestjs/common';
import {
  ApiBody,
  ApiResponse,
  ApiSecurity,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import { MeUseCase } from './../../../application/use-cases/me-use-case';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { RegisterRequestDto } from '../dtos/register-request.dto';
import { LoginUseCase } from './../../../application/use-cases/login.use-case';
import { RegisterUseCase } from './../../../application/use-cases/register.use-case';
import { UserRequest } from '@thp/common/types/http/user-request.type';

@ApiTags('Auth')
@Controller({
  version: VERSION_NEUTRAL,
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly meUseCase: MeUseCase,
    private readonly configService: ConfigService,
  ) {}

  @ApiSecurity('Authorization')
  @ApiBody({
    description: 'Get a signed web token to make protected requests',
    type: LoginRequestDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Login successful',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials or expired token',
  })
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @Post('/login')
  public async login(
    @Body() credentials: LoginRequestDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.loginUseCase.exec(
      credentials.email,
      credentials.password,
    );

    return token;
  }

  @ApiSecurity('Authorization')
  @ApiBody({
    description: 'Register an administrator at first time',
    type: RegisterRequestDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Admin registered and logged in successful',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials or expired token',
  })
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests in a short time',
  })
  @Post('/register')
  public async register(
    @Body() credentials: RegisterRequestDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.registerUseCase.exec(
      credentials.email,
      credentials.password,
      credentials.profile,
    );

    return token;
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  public async me(@Req() request: UserRequest) {
    return await this.meUseCase.exec(request.user.id);
  }
}
