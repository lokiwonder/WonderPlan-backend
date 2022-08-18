import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/data-access/schemas/user.schema';
import { UserRepository } from './user.repository';
import { CompanyRepository } from './company-repository';
import { Company } from './schemas';
import { CompanySchema } from './schemas/company.schema';
import { ChatRepository } from './chat-repository';
import { Chat, ChatSchema } from './schemas/chat.schema';

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
    ]),
  ],
  providers: [UserRepository, CompanyRepository, ChatRepository],
  exports: [UserRepository, CompanyRepository, ChatRepository, MongooseModule],
})
export class DataAccessModule {}
