import { Company } from 'src/_commons/schemas/company.schema';
import { User } from 'src/_commons/schemas/user.schema';

// todo: 출근상태, 직책, 연차값 추가, Company 작성 필요 //
export interface IUser {
  user: User;
  company: Company;
}
