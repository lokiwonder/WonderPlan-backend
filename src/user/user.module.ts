import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

// module : User 관련 Module //
@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
