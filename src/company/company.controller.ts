import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Company, User } from 'src/data-access/schemas';
import {
  COMPANY_API,
  CREATE_COMPANY_API,
  READ_COMPANY_API,
  READ_COMPANY_LIST_API,
} from 'src/_commons/constants/api-end-point';
import { getUser } from 'src/_commons/decorators';
import { CompanyService } from './company.service';
import { CreateCompanyDTO, ReadCompanyDTO } from './dto';
import { CompanyListRes } from './interface/ReadCompanyListRespose.interface';

@Controller(COMPANY_API)
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  // description: 회사 등록 //
  @Post(CREATE_COMPANY_API)
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  async createCompany(
    @Body() dto: CreateCompanyDTO,
    @getUser() user: User,
  ): Promise<void> {
    console.log(dto);
    await this.companyService.createCompany(dto, user);
  }

  // description: 개별 회사 조회 //
  @Get(`${READ_COMPANY_API}/:companyNumber`)
  @UsePipes(ValidationPipe)
  async readCompany(@Param() dto: ReadCompanyDTO): Promise<Company> {
    const company = await this.companyService.readCompany(dto);
    return company;
  }

  // description : 회사 목록 조회 //
  @Get(READ_COMPANY_LIST_API)
  async readCompanyList(): Promise<CompanyListRes[]> {
    const companyList = await this.companyService.readCompanyList();
    return companyList;
  }
}
