import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  AUTH_API,
  GOOGLE_LOGIN_API,
} from 'src/_commons/constants/api-end-point';
import { AuthService } from './auth.service';
import { GoogleLoginDTO } from './dto';
import { GoogleLoginRes } from './interface/GoogleLoginRes.interface';

@Controller(AUTH_API)
export class AuthController {
  constructor(private authService: AuthService) {}

  // arg : DTO(email, idToken) //
  // return : interface(사용자 정보 + 회사 정보 + 출근 상태 + accessToken) //
  // todo: 반환타입 작성하기 //
  @Post(GOOGLE_LOGIN_API)
  @UsePipes(ValidationPipe)
  async googleLogin(@Body() dto: GoogleLoginDTO): Promise<GoogleLoginRes> {
    console.log(dto);
    const googleLoginRes = await this.authService.googleLogin(dto);
    return googleLoginRes;
  }
}
