import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { CompanyRepository } from 'src/data-access/company-repository';
import { UserRepository } from 'src/data-access/user.repository';

dotenv.config();

@Module({
  imports: [DataAccessModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    CompanyRepository,
    JwtService,
    JwtStrategy,
    ConfigService,
  ],
  exports: [AuthService, JwtService, JwtStrategy],
})
export class AuthModule {}
