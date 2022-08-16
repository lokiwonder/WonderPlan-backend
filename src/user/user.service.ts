import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // todo: DTO로 받아온 유저데이터를 통해 유저 생성 //
  createUser() {
    const { userEmail } = dto;
    const user: User = this.readUser(userEmail);
    if(user === undefined || user === null) {
        // 해당 email로 가입된 유저 없으므로 가입 진행
    } else {
        // 이미 존재하는 유저이므로 throw new BadRequestException
        throw new BadRequestException(`already exist user with email ${userEmail}`); 
    }
    const { userEmail, userName, userProfile, userBirth, userPhone } = //dto//

  }

  // todo: repository를 통해 email 로 userData 받아오기 //
  // arg: email: string //
  // return : userData: ? //
  readUser(email: string) {
    return this.readUser(email);
  }
}
