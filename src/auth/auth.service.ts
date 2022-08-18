import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthRepository } from 'src/data-access/auth-repository';
import { CompanyRepository } from 'src/data-access/company-repository';
import { GoogleLoginRes } from './interface/GoogleLoginRes.interface';
import { IWorkingStatus } from 'src/_commons/interfaces';
import { JWT_SECRET } from './constant';

import { User } from 'src/data-access/schemas/user.schema';

import { GoogleLoginDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private authRepository: AuthRepository,
    private companyRepository: CompanyRepository,
  ) {}

  // function: 로그인 함수 //
  // arg     : dto (Request body로 전달 받은 회원 이메일, 구글 인증 token) //
  // return  : googleLoginResponseData (유저정보, 회사정보, 출근 상태, access token을 포함한 데이터) //
  // todo: 반환타입 지정 //
  async googleLogin(dto: GoogleLoginDTO): Promise<GoogleLoginRes> {
    // variable: 회원 이메일 //
    const { userEmail } = dto;
    // description: 이메일을 조건으로 회원 검색 //
    const user = await this.authRepository.readUser(userEmail);

    // description: 조건에 따른 회원이 데이터베이스에 존재하지 않을 때 http status 400 반환 //
    if (!user) throw new BadRequestException();

    // description: access token 생성 //
    const accessToken = this.createAccessToken(user);

    // description: 회사정보 조회를 위한 companyNumber 비구조화 //
    const { companyNumber } = user;
    // description: 사업자등록번호로 회사 정보 조회 //
    const company = await this.companyRepository.readCompany(companyNumber);

    // description: 사용자 출근 상태 조회 //
    // todo: 출근 상태 검색 //
    const workingStatus = null;

    // description : 사용자 정보 + 회사 정보 + 출근 상태 + accessToken을 객체로 생성 //
    const googleLoginRes: GoogleLoginRes = {
      user,
      company,
      workingStatus,
      accessToken,
    };

    return googleLoginRes;
  }

  // function : access token 생성 함수 //
  // arg      : user (access token을 생성할 유저 객체) //
  // return   : accessToken (회원 이메일, 사업자 등록번호, 직책을 포함한 JWT Token) //
  createAccessToken(user: User): string {
    // variable: 회원 이메일, 사업자등록번호, 직책 //
    const { userEmail, companyNumber, userType } = user;
    // description: jwt paload - {회원 이메일, 사업자 등록번호, 직책} //
    const payload = {
      userEmail,
      companyNumber,
      userType,
    };
    console.log(payload);
    // description: payload를 이용해 accessToken 생성 //
    const accessToken = this.jwtService.sign(payload, { secret: JWT_SECRET });

    return accessToken;
  }
}
