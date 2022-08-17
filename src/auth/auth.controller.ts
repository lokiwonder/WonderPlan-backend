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

@Controller(AUTH_API)
export class AuthController {
  constructor(private authService: AuthService) {}

  // arg : DTO(email, idToken) //
  // return : interface(userData + accessToken) //
  // todo: 반환타입 작성하기 //
  @Post(GOOGLE_LOGIN_API)
  @UsePipes(ValidationPipe)
  googleLogin(@Body() dto: GoogleLoginDTO) {
    return this.authService.googleLogin(dto);
  }
}
