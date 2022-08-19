import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/data-access/schemas/user.schema';
import { UserRepository } from './user.repository';
import { CompanyRepository } from './company-repository';
import { Commute, Company } from './schemas';
import { CompanySchema } from './schemas/company.schema';
import { ChatRepository } from './chat-repository';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { CommuteRepository } from './commute-repository';
import { CommuteSchema } from './schemas/commute.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Company.name,
        schema: CompanySchema,
      },
      {
        name: Chat.name,
        schema: ChatSchema,
      },
      {
        name: Commute.name,
        schema: CommuteSchema,
      },
    ]),
  ],
  providers: [
    UserRepository,
    CompanyRepository,
    ChatRepository,
    CommuteRepository,
  ],
  exports: [UserRepository, CompanyRepository, ChatRepository, MongooseModule],
})
export class DataAccessModule {}
