import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyRepository {
  // todo: db에 insert 필요 //
  createCompany(company) {}

  // todo: db에서businessRegistrationNumber에 해당하는 company select 필요 //
  readCompany(businessRegistrationNumber) {}
}
