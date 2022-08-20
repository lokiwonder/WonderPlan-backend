import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { CompanyRepository } from 'src/data-access/company-repository';
import { UserRepository } from 'src/data-access/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import {
  JWT_SECRET,
  JWT_SIGN_OPTOINS,
  PASSPORT_DEFAULT_STRATEGY,
} from 'src/_commons/constants';
import { CommuteRepository } from 'src/data-access/commute-repository';

@Module({
  imports: [
    DataAccessModule,
    PassportModule.register({ defaultStrategy: PASSPORT_DEFAULT_STRATEGY }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: JWT_SIGN_OPTOINS,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UserRepository,
    CompanyRepository,
    CommuteRepository,
  ],
  exports: [JwtStrategy, JwtModule, PassportModule],
})
export class AuthModule {}
