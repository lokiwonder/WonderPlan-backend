// interface : 회사 목록 조회용 인터페이스 //
export interface CompanyListRes {
  // description : 사업자등록번호 //
  businessRegistrationNumber: string;

  // description : 회사명 //
  companyName: string;

  // description : 대표자 성명 //
  representativeName: string;

  // description : 회사 주소 //
  companyAddress: string;
}
