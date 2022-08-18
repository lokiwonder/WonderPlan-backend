import { IsNotEmpty, IsString } from 'class-validator';

export class RequestJoinCompanyDTO {
  @IsString()
  @IsNotEmpty()
  companyNumber: string;
}
