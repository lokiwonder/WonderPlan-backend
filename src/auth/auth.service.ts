import { BadRequestException, Injectable } from '@nestjs/common';
import { GoogleLoginDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/data-access/schemas/user.schema';
import { AuthRepository } from 'src/data-access/auth-repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private authRepository: AuthRepository,
  ) {}

  // function: 로그인 함수 //
  // arg     : dto (Request body로 전달 받은 회원 이메일, 구글 인증 token) //
  // return  : googleLoginResponseData (유저정보, 회사정보, 출근 상태, access token을 포함한 데이터) //
  // todo: 반환타입 지정 //
  async googleLogin(dto: GoogleLoginDTO) {
    // variable: 회원 이메일 //
    const { email } = dto;
    // description: 이메일을 조건으로 회원 검색 //
    const user = await this.authRepository.readUser(email);

    // description: 조건에 따른 회원이 데이터베이스에 존재하지 않을 때 http status 400 반환 //
    if (user === null || user === undefined) throw new BadRequestException();

    // description: access token 생성 //
    const accessToken = this.createAccessToken(user);
    // todo: 회사 정보 검색 //
    // const company
    // todo: 출근 상태 검색 //
    // todo: 반환 객체 생성 //
  }

  // function : access token 생성 함수 //
  // arg      : user (access token을 생성할 유저 객체) //
  // return   : accessToken (회원 이메일, 사업자 등록번호, 직책을 포함한 JWT Token) //
  createAccessToken(user: User) {
    // variable: 회원 이메일, 사업자등록번호, 직책 //
    const { userEmail, companyNumber, userType } = user;
    // description: jwt paload - {회원 이메일, 사업자 등록번호, 직책} //
    const payload = {
      userEmail,
      companyNumber,
      userType,
    };
    // description: payload를 이용해 accessToken 생성 //
    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }
}
