import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CompanyRepository } from 'src/data-access/company-repository';
import { GoogleLoginRes } from './interface/GoogleLoginRes.interface';
import { IWorkingStatus } from 'src/_commons/interfaces';

import { User } from 'src/data-access/schemas/user.schema';

import { GoogleLoginDTO } from './dto';
import { UserRepository } from 'src/data-access/user.repository';
import { JWT_SECRET } from 'src/_commons/constants';
import { CommuteRepository } from 'src/data-access/commute-repository';
import { getCommuteDateTime } from 'src/commute/function';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private companyRepository: CompanyRepository,
    private commuteRepository: CommuteRepository,
  ) {}

  // function: 로그인 함수 //
  // arg     : dto (Request body로 전달 받은 회원 이메일, 구글 인증 token) //
  // return  : googleLoginResponseData (유저정보, 회사정보, 출근 상태, access token을 포함한 데이터) //
  async googleLogin(dto: GoogleLoginDTO): Promise<GoogleLoginRes> {
    // variable: 회원 이메일 //
    const userEmail = dto.email;
    // description: 이메일을 조건으로 회원 검색 //
    const user = await this.userRepository.readUser(userEmail);

    // description: 조건에 따른 회원이 데이터베이스에 존재하지 않을 때 http status 400 반환 //
    if (!user) throw new BadRequestException();

    // description: access token 생성 //
    const accessToken = await this.createAccessToken(user);

    // description: 회사정보 조회를 위한 companyNumber 비구조화 //
    const { companyNumber } = user;
    // description: 사업자등록번호로 회사 정보 조회 //
    const company = await this.companyRepository.readCompany(companyNumber);

    // description: 출근 상태 조회를 위한 현재 일자 및 시간 객체 생성 //
    const commuteDateTime = getCommuteDateTime();
    // description: 일자 추출을 위한 비구조화 //
    const { commuteDate } = commuteDateTime;
    // description: 사용자 출근 기록 조회 //
    // todo: 출근 상태 검색 //
    const commuteRecords = await this.commuteRepository.readTodaysRecords(
      user,
      commuteDate,
    );
    //description: 사용자 출근 기록을 추출하기 위한 비구조화 //
    const workingStatus =
      commuteRecords.length > 0
        ? commuteRecords[0].workingStatus
        : IWorkingStatus.LEAVEWORK;

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
  async createAccessToken(user: User): Promise<string> {
    // variable: 회원 이메일, 사업자등록번호, 직책 //
    const { userEmail, companyNumber, userType } = user;
    // description: jwt paload - {회원 이메일, 사업자 등록번호, 직책} //
    const payload = {
      userEmail,
      companyNumber,
      userType,
    };
    const secret = await { secret: JWT_SECRET };
    // description: payload를 이용해 accessToken 생성 //
    const accessToken = await this.jwtService.sign(payload, secret);
    console.log(accessToken);

    return accessToken;
  }
}
