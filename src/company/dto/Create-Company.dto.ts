import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

// class: 회사 등록 API (/apis/company/createCompany) DataTransferObject //
export default class CreateCompanyDTO {
  // description: 사업자 등록 번호 //
  @IsNotEmpty()
  @IsString()
  businessRegistrationNumber: string;

  // description: 회사명 //
  @IsNotEmpty()
  @IsString()
  companyName: string;

  // description: 개업일 //
  @IsNotEmpty()
  @IsString()
  @IsDateString()
  companyOpeningDate: string;

  // description: 대표자 성명 //
  @IsNotEmpty()
  @IsString()
  representativeName: string;

  // description: 회사 주소 //
  @IsNotEmpty()
  @IsString()
  companyAddress: string;
}
