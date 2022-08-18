import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/data-access/schemas/user.schema';
import { UserRepository } from './user.repository';
import { AuthRepository } from './auth-repository';
import { CompanyRepository } from './company-repository';
import { Company } from './schemas';
import { CompanySchema } from './schemas/company.schema';

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
    ]),
  ],
  providers: [UserRepository, AuthRepository, CompanyRepository],
  exports: [UserRepository, AuthRepository, CompanyRepository, MongooseModule],
})
export class DataAccessModule {}
