import { BadRequestException, Injectable } from '@nestjs/common';
import CreateUserDTO from './dto/Create-User.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/data-access/user.repository';
import { AuthService } from 'src/auth/auth.service';

// description : 사용자 기능을 제공하는 Service //
@Injectable()
export class UserService {
  constructor(
    private authService: AuthService,
    private userRepository: UserRepository, // private userRepository: UserRepository,
  ) {}

  // todo: 반환타입 작성하기 //
  // arg: userEmail, userName, userProfile, userBirth, userTel, companyNumber?: string = null //
  // return:  //
  // description: 사용자 이메일로 가입여부를 체크한 후  //
  async createUser(createUserDto: CreateUserDTO) {
    const { userEmail } = createUserDto;
    const readedUser = this.userRepository.readUser(userEmail);
    if (readedUser !== undefined && readedUser !== null)
      throw new BadRequestException();
    // 해당 email로 가입된 유저 없으므로 가입 진행
    const createdUser = await this.userRepository.createUser(createUserDto);
    const accessToken = this.authService.createAccessToken(createdUser);
    console.log(createdUser);
    console.log(accessToken);
    // 이미 존재하는 유저이므로 throw new BadRequestException
  }

  // todo: 반환타입 작성하기 //
  // arg: email: string //
  // return : userData: ? //
  readUser(userEmail: string) {
    return this.userRepository.readUser(userEmail);
  }
}
