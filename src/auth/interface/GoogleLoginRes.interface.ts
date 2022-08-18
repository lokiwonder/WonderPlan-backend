import { Company, User } from 'src/data-access/schemas';
import { IWorkingStatus } from 'src/_commons/interfaces';

// interface : 구글 로그인 이후 반환되는 유저 관련 정보 //
// todo: 연차값 추가 필요 //
export interface GoogleLoginRes {
  // description : 사용자 정보 //
  user: User;

  // description : 회사 정보 //
  company: Company;

  // description : 근무 상태 //
  workingStatus: IWorkingStatus;

  // description : 사용자 인증 토큰 //
  accessToken: string;
}
