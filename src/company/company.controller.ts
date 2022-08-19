import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Company, User } from 'src/data-access/schemas';
import { PASSPORT_DEFAULT_STRATEGY } from 'src/_commons/constants';
import {
  APPROVING_COMPANY_MEMBERSHIP_API,
  COMPANY_API,
  CREATE_COMPANY_API,
  DENY_COMPANY_MEMBERSHIP_API,
  READ_COMPANY_API,
  READ_COMPANY_LIST_API,
  READ_JOIN_COMPANY_REQUEST_LIST_API,
} from 'src/_commons/constants/api-end-point';
import { ConfirmationPersonnelAuthority } from 'src/_commons/decorators';
import { CompanyService } from './company.service';
import {
  ControlCompanyMembershipDTO,
  CreateCompanyDTO,
  ReadCompanyDTO,
} from './dto';
import {
  IReadCompanyListResponse,
  IReadJoinCompanyRequestListResponse,
} from './interface';

// controller : Company API 관련 Controller //
@Controller(COMPANY_API)
@UseGuards(AuthGuard(PASSPORT_DEFAULT_STRATEGY))
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  // router : 회사 등록 //
  @Post(CREATE_COMPANY_API)
  @UsePipes(ValidationPipe)
  async createCompany(
    @Body() dto: CreateCompanyDTO,
    @ConfirmationPersonnelAuthority() user: User,
  ): Promise<void> {
    await this.companyService.createCompany(dto, user);
  }

  // router: 개별 회사 조회 //
  @Get(`${READ_COMPANY_API}`)
  @UsePipes(ValidationPipe)
  async readCompany(@Param() dto: ReadCompanyDTO): Promise<Company> {
    const company = await this.companyService.readCompany(dto);
    return company;
  }

  // router : 회사 목록 조회 //
  @Get(READ_COMPANY_LIST_API)
  async readCompanyList(): Promise<IReadCompanyListResponse[]> {
    const companyList = await this.companyService.readCompanyList();
    return companyList;
  }

  // router: 회사 가입 요청 목록 조회 //
  @Get(READ_JOIN_COMPANY_REQUEST_LIST_API)
  async readJoinCompanyRequestList(
    @ConfirmationPersonnelAuthority() user: User,
  ): Promise<IReadJoinCompanyRequestListResponse[]> {
    const readJoinCompanyRequestList =
      this.companyService.readJoinCompanyRequestList(user);
    return readJoinCompanyRequestList;
  }

  // router: 회원 가입 승인 //
  @Patch(APPROVING_COMPANY_MEMBERSHIP_API)
  async approvingCompanyMembership(
    @ConfirmationPersonnelAuthority() user: User,
    @Body() dto: ControlCompanyMembershipDTO,
  ): Promise<{ result: boolean }> {
    const { targetUserEmail } = dto;
    const result = await this.companyService.approvingCompanyMembership(
      targetUserEmail,
    );
    return { result };
  }

  // router: 회원 가입 거절 //
  @Patch(DENY_COMPANY_MEMBERSHIP_API)
  async denyCompanyMembership(
    @ConfirmationPersonnelAuthority() user: User,
    @Body() dto: ControlCompanyMembershipDTO,
  ): Promise<{ result: boolean }> {
    const { targetUserEmail } = dto;
    const result = await this.companyService.denyCompanyMembership(
      targetUserEmail,
    );
    return { result };
  }
}
