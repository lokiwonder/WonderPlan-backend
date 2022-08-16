import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// class : 구글 로그인 API (/apis/auth/googleLogin) DataTransferObject //
export default class GoogleLoginDTO {
  // description : 회원 이메일 //
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  // description : googleAuth ID Token //
  @IsNotEmpty()
  @IsString()
  idToken: string;
}
