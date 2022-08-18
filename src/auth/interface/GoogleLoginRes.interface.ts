import { Company, User } from 'src/data-access/schemas';
import { IWorkingStatus } from 'src/_commons/interfaces';

// todo: 출근상태, 직책, 연차값 추가, Company 작성 필요 //
export interface GoogleLoginRes {
  user: User;
  company: Company;
  workingStatus: IWorkingStatus;
  accessToken: string;
}
