import { ICommutingTime } from './CommutingTime.interface';
import { IGeo } from './Geo.interface';
// interface : 회사 정보 //
export interface ICompany {
  // description : 사업자등록번호 //
  businessRegistrationNumber: string;

  // description : 회사명 //
  companyName: string;

  // description : 대표자 성명 //
  representativeName: string;

  // description : 개업일 //
  companyOpeningDate: string;

  // description : 회사 주소 //
  companyAddress: string;

  // description : 회사 좌표 //
  companyLocation: IGeo;

  // description : 출퇴근시간 //
  commutingTime: ICommutingTime;
}
