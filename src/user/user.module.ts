import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UserRepository } from 'src/data-access/user.repository';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CommuteRepository } from 'src/data-access/commute-repository';

// module : User 관련 Module //
@Module({
  imports: [AuthModule, DataAccessModule, PassportModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    CommuteRepository,
    AuthService,
    JwtStrategy,
  ],
})
export class UserModule {}
