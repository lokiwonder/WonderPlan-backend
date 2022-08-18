import { ICompany } from 'src/_commons/interfaces';
import { IReadCompanyListResponse } from '../interface';

// function: CompanyService의 readCompanyLis method response daa setting //
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
