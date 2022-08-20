import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/data-access/schemas/user.schema';
import { UserRepository } from './user.repository';
import { CompanyRepository } from './company-repository';
import { Commute, Company } from './schemas';
import { CompanySchema } from './schemas/company.schema';
import { CommuteRepository } from './commute-repository';
import { CommuteSchema } from './schemas/commute.schema';
import { CalendarRepository } from './calendar-repository';

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
        name: Commute.name,
        schema: CommuteSchema,
      },
    ]),
  ],
  providers: [
    UserRepository,
    CompanyRepository,
    CommuteRepository,
    CalendarRepository,
  ],
  exports: [
    UserRepository,
    CompanyRepository,
    CalendarRepository,
    MongooseModule,
  ],
})
export class DataAccessModule {}
