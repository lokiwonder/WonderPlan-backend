import { User } from 'src/data-access/schemas';

export interface CreateUserRes {
  user: User;
  accessToken: string;
}
