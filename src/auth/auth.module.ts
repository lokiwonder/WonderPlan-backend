import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_SECRET, JWT_SIGN_OPTOINS, PASSPORT_STRATEGY } from './constant';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register(PASSPORT_STRATEGY),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: JWT_SIGN_OPTOINS,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
