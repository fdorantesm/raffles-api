import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { IdGeneratorModule } from './../../../libs/id-generator/src/id-generator.module';
import { AuthController } from './infrastructure/http/controllers/auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { UsersModule } from '../users/users.module';
import { tokenConfigLoader } from './application/config/loaders/token.config-loader';
import { TokenService } from './application/services/token.service';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { JwtStrategy } from './infrastructure/passport/jwt/jwt.strategy';
import { JwtGuard } from './application/guards/jwt.guard';
import { ValidateBackofficeTokenUseCase } from './application/use-cases/validate-backoffice-token.use-case';
import { JwtConfiguration } from '@thp/common/types/jwt/jwt.configuration';
import { MeUseCase } from './application/use-cases/me-use-case';
import { CookieStrategy } from './infrastructure/passport/cookie/cookie.strategy';
import { CookieGuard } from './application/guards/cookie.guard';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    CqrsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(tokenConfigLoader)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<JwtConfiguration>('jwt');
        return {
          secret: config.secret,
          signOptions: {
            expiresIn: config.expires,
          },
        };
      },
    }),
    SharedModule,
    UsersModule,
    IdGeneratorModule,
  ],
  providers: [
    TokenService,
    LoginUseCase,
    RegisterUseCase,
    JwtStrategy,
    CookieGuard,
    CookieStrategy,
    JwtGuard,
    ValidateBackofficeTokenUseCase,
    MeUseCase,
  ],
  exports: [TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
