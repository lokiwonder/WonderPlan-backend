import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  AUTH_API,
  GOOGLE_LOGIN_API,
} from 'src/_commons/constants/api-end-point';
import { AuthService } from './auth.service';

@Controller(AUTH_API)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // todo: need to define DTO, exception handling, response type //
  // arg : DTO(email, idToken) //
  // return : interface(userData + accessToken) //
  @Post(GOOGLE_LOGIN_API)
  googleLogin(@Body() ) {
    this.authService.googleLogin(email);
  }

}
