import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
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
  exports: [AuthService, JwtService, JwtStrategy],
})
export class AuthModule {}
