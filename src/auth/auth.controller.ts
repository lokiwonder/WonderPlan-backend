import { Controller, Get } from '@nestjs/common';
import {
  AUTH_API,
  GOOGLE_LOGIN_API,
} from 'src/_commons/constants/api-end-point';
import { AuthService } from './auth.service';

@Controller(AUTH_API)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(GOOGLE_LOGIN_API)
  googleLogin() {
    this.authService.googleLogin();
  }
}
