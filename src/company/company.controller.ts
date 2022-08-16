import { Body, Controller, Post } from '@nestjs/common';
import {
  COMPANY_API,
  CREATE_COMPANY_API,
} from 'src/_commons/constants/api-end-point';

@Controller(COMPANY_API)
export class CompanyController {
  
  // todo: DTO 및 반환타입 작성 필요 //
  @Post(CREATE_COMPANY_API)
  createCompany(@Body() ) {

  }

  // todo: need to define parameters response Type //


}
