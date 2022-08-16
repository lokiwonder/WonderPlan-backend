import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// class: 회원 정보 조회 API (/apis/auth/readUser) DataTransferObject //
export default class ReadUserDTO {
  // description: 회원 이메일 //
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  userEmail: string;
}
