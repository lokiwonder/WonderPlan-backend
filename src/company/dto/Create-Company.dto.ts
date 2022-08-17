import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  // description: 회사 죄표 - 경도 //
  @IsNotEmpty()
  @IsString()
  locationLon: string;

  // description: 회사 죄표 - 위도 //
  @IsNotEmpty()
  @IsString()
  locationLat: string;

  // description: 최소 출근 시간 //
  @IsNotEmpty()
  @IsString()
  minimumOfficeHour: string;

  // description: 최대 출근 시간 //
  @IsNotEmpty()
  @IsString()
  maximumOfficeHour: string;

  // description: 최소 퇴근 시간 //
  @IsNotEmpty()
  @IsString()
  minimumLeaveHour: string;

  // description: 최대 퇴근 시간 //
  @IsNotEmpty()
  @IsString()
  maximumLeaveHour: string;

  // description: 최소 근무 시간 //
  @IsNotEmpty()
  @IsNumber()
  workingTikme: number;
}
