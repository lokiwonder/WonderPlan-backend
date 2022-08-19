import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { throwIfEmpty } from 'rxjs';
import { CompanyRepository } from 'src/data-access/company-repository';
import { Company, User } from 'src/data-access/schemas';
import { UserRepository } from 'src/data-access/user.repository';
import { UserType } from 'src/_commons/interfaces/UserType.interface';
import { CreateCompanyDTO, ReadCompanyDTO } from './dto';
import {
  callBusinessRegistrationNumberAuthenticityCheckAPI,
  generateCompany,
  setReadCompanyListResponse,
  generateReadJoinCompanyRequestListObject,
} from './function';
import {
  IReadCompanyListResponse,
  IReadJoinCompanyRequestListResponse,
} from './interface';

@Injectable()
export class CompanyService {
  constructor(
    private httpService: HttpService,
    private companyRepository: CompanyRepository,
    private userRepository: UserRepository,
  ) {}

  // function : 회사 정보 생성 및 삽입 //
  // arg      : CreateCompanyDTO //
  // return   : Company () //
  async createCompany(dto: CreateCompanyDTO, user: User): Promise<void> {
    // description : 국세청 사업자등록번호 진위 확인 API call을 위한 비구조화 //
    const {
      businessRegistrationNumber,
      companyOpeningDate,
      representativeName,
    } = dto;
    // description: 사용자 정보 변경을 위한 비구조화 //
    const { userEmail } = user;

    // description: 국세청 사업자등록번호 진위 확인 API call을 위한 데이터 설정 //
    const datas = [
      {
        b_no: businessRegistrationNumber,
        start_dt: companyOpeningDate,
        p_nm: representativeName,
      },
    ];
    const businesses = { businesses: datas };

    // description: 국세청 사업자등록번호 진위 확인 API call //
    await callBusinessRegistrationNumberAuthenticityCheckAPI(businesses);

    // description: 이미 생성된 회사 판별을 위한 회사 조회 //
    const readedCompany = await this.companyRepository.readCompany(
      businessRegistrationNumber,
    );
    // description: 조건에 따른 회사가 데이터베이스에 존재할 때 http status 400 반환 //
    if (readedCompany !== null) throw new BadRequestException();

    // description : 회사 정보를 담은 객체 생성 //
    const company = generateCompany(dto);
    // description : 회사 등록 //
    await this.companyRepository.createCompany(company);

    // description : 사용자 직책을 [관리자]로 사업자등록번호 수정 //
    await this.userRepository.updateUserForCompanyAdmin(
      userEmail,
      businessRegistrationNumber,
    );
  }

  // function : 회사정보 수정페이지 출력을 위한 회사 상세 조회 //
  // arg      : ReadCompanyDTO(companyName) //
  // return   : Company - 회사 정보 //
  async readCompany(dto: ReadCompanyDTO): Promise<Company> {
    // description : 회사 정보 조회를 위한 사업자등록번호 비구조화 //
    const { companyNumber } = dto;
    // description : 회사 정보 조회 //
    const company = await this.companyRepository.readCompany(companyNumber);
    return company;
  }

  // function : 회원가입 시 회사등록을 위한 회사 목록 조회 //
  // return   : Company[] -  //
  async readCompanyList(): Promise<IReadCompanyListResponse[]> {
    // description : 회사 정보 목록 조회 //
    const companyList = await this.companyRepository.readCompanyList();
    // description : 반환타입 List 선언 //
    const responseList: IReadCompanyListResponse[] = [];

    // description : 반환타입 List에 데이터 전달 //
    companyList.forEach((company) =>
      setReadCompanyListResponse(responseList, company),
    );
    return responseList;
  }

  // function : 회사에 가입을 신청한 사용자 목록 조회 //
  // arg      : User - 사용자 이메일, 사용자 이름, 프로필 사진, 생년월일 //
  // return   : IReadJoinCompanyRequestListResponse[] - (사용자 이메일, 사용자 이름, 프로필 사진) //
  async readJoinCompanyRequestList(
    user: User,
  ): Promise<IReadJoinCompanyRequestListResponse[]> {
    // description : 요청자(관리자) 정보 중 사업자등록번호 비구조화 //
    const { companyNumber } = user;
    // description : 요청자와 같은 사업자등록번호를 가지며 직책이 없는 사용자 목록 조회 //
    const userList = await this.companyRepository.readJoinCompanyRequestList(
      companyNumber,
    );
    // description : 사용자 정보 중 반환할 데이터만 가질 수 있도록 가공 //
    const readJoinCompanyRequestList =
      generateReadJoinCompanyRequestListObject(userList);
    return readJoinCompanyRequestList;
  }

  // function : 선택한 사용자의 회사 가입 승인 //
  // arg      : targetUserEmail - 승인결정한 사용자의 이메일 //
  // return   : boolean - 승인 처리 결과 //
  async approvingCompanyMembership(targetUserEmail: string): Promise<boolean> {
    // description : targetUserEmail에 해당하는 사용자의 직책을 STAFF로 수정 //
    const result = await this.companyRepository.updateUserType(
      targetUserEmail,
      UserType.STAFF,
    );
    return result;
  }

  // function : 선택한 사용자의 회사 가입 거절 //
  // arg      : targetUserEmail - 가입 거절하기로 결정한 사용자의 이메일 //
  // return   : boolean - 거절 처리 결과 //
  async denyCompanyMembership(targetUserEmail: string): Promise<boolean> {
    // description : targetUserEmail에 해당하는 사용자의 사업자등록번호를 null로 수정 //
    const result = await this.companyRepository.updateUserCompanyName(
      targetUserEmail,
    );
    return result;
  }
}
