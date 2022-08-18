import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_SECRET, JWT_SIGN_OPTOINS, PASSPORT_STRATEGY } from './constant';
import { PassportModule } from '@nestjs/passport';
import { AuthRepository } from 'src/data-access/auth-repository';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { CompanyRepository } from 'src/data-access/company-repository';

dotenv.config();

@Module({
  imports: [DataAccessModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    CompanyRepository,
    JwtService,
    JwtStrategy,
    ConfigService,
  ],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
