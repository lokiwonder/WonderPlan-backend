import { BadRequestException, Injectable } from '@nestjs/common';
import { CompanyRepository } from 'src/data-access/company-repository';
import { Company } from 'src/data-access/schemas';
import { ICommutingTime, IGeo } from 'src/_commons/interfaces';
import { CreateCompanyDTO, ReadCompanyDTO } from './dto';
import { CompanyListRes } from './interface/CompanyListRes.interface';

@Injectable()
export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  // function : 회사 정보 생성 및 삽입 //
  // arg      : CreateCompanyDTO //
  // return   : Company //
  // todo : 로직 작성 및 반환타입 작성 필요 //
  async createCompany(dto: CreateCompanyDTO): Promise<Company> {
    // description : 개별 객체(IGeo, ICommutingTime, Company) 생성을 위한 비구조화 //
    const {
      businessRegistrationNumber,
      companyName,
      companyOpeningDate,
      representativeName,
      companyAddress,
      locationLon,
      locationLat,
      minimumOfficeHour,
      maximumOfficeHour,
      minimumLeaveHour,
      maximumLeaveHour,
      workingTime,
    } = dto;

    // description : 이미 생성된 회사 판별을 위한 회사 조회 //
    const readedCompany = await this.companyRepository.readCompany(
      businessRegistrationNumber,
    );
    // description : 조건에 따른 회사가 데이터베이스에 존재할 때 http status 400 반환 //
    if (readedCompany !== null && readedCompany !== undefined)
      throw new BadRequestException();

    // description : 회사 위치 정보를 담은 객체 생성 //
    const companyLocation: IGeo = {
      type: 'point',
      coordinates: [locationLon, locationLat],
    };
    // description : 회사 출근시간 정보를 담은 객체 생성 //
    const commutingTime: ICommutingTime = {
      minimumOfficeHour,
      maximumOfficeHour,
      minimumLeaveHour,
      maximumLeaveHour,
      workingTime,
      lunchTime: null,
    };
    // description : 회사 정보를 담은 객체 생성 //
    const company: Company = {
      businessRegistrationNumber,
      companyName,
      companyOpeningDate,
      representativeName,
      companyAddress,
      companyLocation,
      commutingTime,
    };
    // description : 회사 등록 //
    const createdCompany = await this.companyRepository.createCompany(company);

    return createdCompany;
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
  async readCompanyList(): Promise<CompanyListRes[]> {
    // description : 회사 정보 목록 조회 //
    const companyList = await this.companyRepository.readCompanyList();
    // description : 반환타입 List 선언 //
    const resList: CompanyListRes[] = [];

    // description : 반환타입 List에 데이터 전달 //
    companyList.forEach((company) => {
      // description : 반환타입 객체로 전달할 사업자등록번호, 회사명, 회사주소, 대표자 성명 비구조화 //
      const {
        businessRegistrationNumber,
        companyName,
        companyAddress,
        representativeName,
      } = company;
      // description : 반환타입 객체 생성 //
      const res: CompanyListRes = {
        businessRegistrationNumber,
        companyName,
        representativeName,
        companyAddress,
      };
      // description : 반환타입 List에 넣기 //
      resList.push(res);
    });
    return resList;
  }
}
