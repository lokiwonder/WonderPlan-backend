import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_SECRET, JWT_SIGN_OPTOINS, PASSPORT_STRATEGY } from './constant';
import { PassportModule } from '@nestjs/passport';
import { AuthRepository } from 'src/data-access/auth-repository';
import { DataAccessModule } from 'src/data-access/data-access.module';

@Module({
  imports: [
    PassportModule.register(PASSPORT_STRATEGY),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: JWT_SIGN_OPTOINS,
      secretOrPrivateKey: JWT_SECRET,
    }),
    DataAccessModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
