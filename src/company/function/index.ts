import { HttpService } from '@nestjs/axios';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/data-access/schemas';
import { ICommutingTime, ICompany, IGeo } from 'src/_commons/interfaces';
import { VALIDATE_COMPANY_URL } from '../constant';
import { CreateCompanyDTO } from '../dto';
import {
  IReadCompanyListResponse,
  IReadJoinCompanyRequestListResponse,
} from '../interface';

// function: CompanyService의 readCompanyList method response data setting //
// arg     : responseList(), company()
// return  : void
export const setReadCompanyListResponse = (
  responseList: IReadCompanyListResponse[],
  company: ICompany,
) => {
  // description : 반환타입 객체로 전달할 사업자등록번호, 회사명, 회사주소, 대표자 성명 비구조화 //
  const {
    businessRegistrationNumber,
    companyName,
    companyAddress,
    representativeName,
  } = company;
  // description : 반환타입 객체 생성 //
  const res: IReadCompanyListResponse = {
    companyNumber: businessRegistrationNumber,
    companyName,
    representativeName,
    companyAddress,
  };
  // description : 반환타입 List에 넣기 //
  responseList.push(res);
};

// function: 국세청 사업자등록번호 진위 확인 API call //
// arg     : url(국세청 사업자등록번호 진위 확인 API 주소), businesses(사업자등록번호, 대표자 성함, 개업일을 담은 객체) //
// return  : void //
export const callBusinessRegistrationNumberAuthenticityCheckAPI = async (
  businesses,
) => {
  const httpService: HttpService = new HttpService();
  try {
    const businessRegistrationNumberAuthenticityCheckResponse =
      await httpService.axiosRef.post(VALIDATE_COMPANY_URL, businesses);
    // description: 반환받은 데이터 비구조화 //
    const { status_code, data } =
      businessRegistrationNumberAuthenticityCheckResponse.data;
    const { valid } = data[0];
    // description: http status가 4xx 혹은 500 일때 혹은 국세청에서 조회되지 않는 경우 진위 확인 실패라 하고 http status 404 반환 //
    if (status_code !== 'OK' || valid !== '01') {
      throw new NotFoundException();
    }
  } catch (err) {
    throw new NotFoundException();
  }
};

// function: 회사 출근시간 정보를 담은 객체 생성 //
// arg     : CreateCompanyDTO - 사업자등록번호, 회사명, 개업일, 대표자 성명, 회사주소, 회사 좌표, 출퇴근시간 정보를 담은 객체 //
// return  : ICommutingTime - 회사 출퇴근시간을 담은 객체 반환 //
export const generateCommutingTimeObject = (dto: CreateCompanyDTO) => {
  const {
    minimumOfficeHour,
    maximumOfficeHour,
    minimumLeaveHour,
    maximumLeaveHour,
    workingTime,
  } = dto;
  const commutingTime: ICommutingTime = {
    minimumOfficeHour,
    maximumOfficeHour,
    minimumLeaveHour,
    maximumLeaveHour,
    workingTime,
    lunchTime: null,
  };
  return commutingTime;
};

export const generateGeoObject = (dto: CreateCompanyDTO) => {
  const { locationLon, locationLat } = dto;
  const geo: IGeo = {
    type: 'point',
    coordinates: [locationLon, locationLat],
  };
  return geo;
};

export const generateCompany = (dto: CreateCompanyDTO) => {
  // description : 개별 객체(IGeo, ICommutingTime, Company) 생성을 위한 비구조화 //
  const {
    businessRegistrationNumber,
    companyName,
    companyOpeningDate,
    representativeName,
    companyAddress,
  } = dto;
  // description: 회사 위치 정보를 담은 객체 생성 //
  const companyLocation = generateGeoObject(dto);
  // description : 회사 출근시간 정보를 담은 객체 생성 //
  const commutingTime = generateCommutingTimeObject(dto);
  const company: ICompany = {
    businessRegistrationNumber,
    companyName,
    companyOpeningDate,
    representativeName,
    companyAddress,
    companyLocation,
    commutingTime,
  };
  return company;
};

export const generateReadJoinCompanyRequestListObject = (
  userList: User[],
): IReadJoinCompanyRequestListResponse[] => {
  const readJoinCompanyRequestList = [];
  userList.forEach((user: User) => {
    const { userEmail, userName, userProfile } = user;
    const readJoinCompanyRequestListResponse = {
      userEmail,
      userName,
      userProfile,
    };
    readJoinCompanyRequestList.push(readJoinCompanyRequestListResponse);
  });
  return readJoinCompanyRequestList;
};
