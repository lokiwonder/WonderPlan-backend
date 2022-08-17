import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  COMPANY_API,
  CREATE_COMPANY_API,
} from 'src/_commons/constants/api-end-point';
import { CompanyService } from './company.service';
import { CreateCompanyDTO } from './dto';

@Controller(COMPANY_API)
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  // todo: DTO 및 반환타입 작성 필요 //
  @Post(CREATE_COMPANY_API)
  @UsePipes(ValidationPipe)
  createCompany(@Body() dto: CreateCompanyDTO) {
    return this.companyService.createCompany(dto);
  }
}
