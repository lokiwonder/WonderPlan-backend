import { Module } from '@nestjs/common';
import { CompanyRepository } from 'src/data-access/company-repository';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  imports: [DataAccessModule],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
})
export class CompanyModule {}
