import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CompanyRepository } from 'src/data-access/company-repository';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  imports: [DataAccessModule, AuthModule],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository, JwtStrategy],
})
export class CompanyModule {}
