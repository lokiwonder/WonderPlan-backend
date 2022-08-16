import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

// class: 회원 등록 API (/apis/auth/createUser) DataTransferObject //
export default class CreateUserDTO {
  // description: 회원 이메일 //
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  userEmail: string;

  // description: 회원 이름 //
  @IsNotEmpty()
  @IsString()
  userName: string;

  // description: 회원 프로필 사진 //
  @IsNotEmpty()
  @IsString()
  userProfile: string;

  // description: 회원 생년월일 (yyyy-MM-dd) //
  @IsNotEmpty()
  @IsString()
  @IsDateString()
  userBirth: string;

  // description: 회원 전화번호 //
  @IsNotEmpty()
  @IsString()
  userTel: string;
}
