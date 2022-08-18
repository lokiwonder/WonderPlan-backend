import { IsNotEmpty, IsString } from 'class-validator';

export default class ReadCompanyDTO {
  // description: 사업자등록번호 //
  @IsNotEmpty()
  @IsString()
  companyNumber: string;
}
