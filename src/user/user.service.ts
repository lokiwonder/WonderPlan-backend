import { BadRequestException, Injectable } from '@nestjs/common';
import CreateUserDTO from './dto/Create-User.dto';
import { UserRepository } from 'src/data-access/user.repository';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/data-access/schemas';
import { CreateUserRes } from './interface/CreateUserRes.interface';
import { ReadUserDTO } from './dto';
import { RequestJoinCompanyDTO } from './dto/Request-Join-Company.dto';

// description : 사용자 기능을 제공하는 Service //
@Injectable()
export class UserService {
  constructor(
    private authService: AuthService,
    private userRepository: UserRepository, // private userRepository: UserRepository,
  ) {}

  // todo: 반환타입 작성하기 //
  // arg: userEmail, userName, userProfile, userBirth, userTel, companyNumber?: string = null //
  // return: CreateUserRes(User, accessToken) //
  // description: 사용자 이메일로 가입여부를 체크한 후  //
  async createUser(createUserDto: CreateUserDTO): Promise<CreateUserRes> {
    // description: 사용자 조회를 위한 userEmail 비구조화 //
    const { userEmail } = createUserDto;
    // description: userEmail로 사용자 정보 조회 //
    const readedUser = await this.userRepository.readUser(userEmail);
    console.log(readedUser);
    // description: 조건에 따른 회원이 데이터베이스에 존재하지 않을 때 http status 400 반환 //
    if (readedUser !== undefined && readedUser !== null)
      throw new BadRequestException();

    // description: 해당 email로 가입된 사용자 없으므로 가입 진행 //
    const createdUser = await this.userRepository.createUser(createUserDto);
    // description: 사용자 정보(userEmail, userType, companyName)를 이용하여 accessToken 생성 //
    const accessToken = this.authService.createAccessToken(createdUser);
    console.log(createdUser);
    console.log(accessToken);
    // description : 가입한 유저 정보 + accessToken으로 반환 객체 생성 //
    const createUserRes: CreateUserRes = {
      user: createdUser,
      accessToken,
    };
    return createUserRes;
  }

  // function : userEmail로 사용자 정보 조회 //
  // arg: userEmail: string //
  // return : User - 사용자 정보 //
  async readUser(readUserDTO: ReadUserDTO): Promise<User> {
    const { userEmail } = readUserDTO;
    console.log(userEmail);
    const user = await this.userRepository.readUser(userEmail);
    return user;
  }

  // function : 회사에 가입을 요청하는 함수 //
  // arg      : User - JWT를 복호화하고 받은 사용자 정보, RequestJoinCompanyDTO(companyNumber) - 가입 요청을 받을 회사의 사업자등록번호 //
  // return   : //
  async requestJoinCompany(
    dto: RequestJoinCompanyDTO,
    user: User,
  ): Promise<void> {
    // description : 사용자 정보 중 사업자등록번호를 변경하기 위한 비구조화 //
    const { userEmail } = user;
    const { companyNumber } = dto;
    // description : userEmail, companyNumber를 이용하여 사업자등록번호 수정 //
    await this.userRepository.updateBusinessRegistrationNumber(
      userEmail,
      companyNumber,
    );
  }
}
