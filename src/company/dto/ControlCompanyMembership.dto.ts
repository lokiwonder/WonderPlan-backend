import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class ControlCompanyMembershipDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  targetUserEmail: string;
}
