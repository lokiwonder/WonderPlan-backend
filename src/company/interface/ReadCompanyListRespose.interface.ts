// interface : 회사 목록 조회용 인터페이스 //
export default interface IReadCompanyListResponse {
  // description : 사업자등록번호 //
  companyNumber: string;

  // description : 회사명 //
  companyName: string;

  // description : 대표자 성명 //
  representativeName: string;

  // description : 회사 주소 //
  companyAddress: string;
}
