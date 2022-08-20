import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from 'src/user/dto';
import { UserType } from 'src/_commons/interfaces/UserType.interface';
import { User } from './schemas';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  // function : 사용자 정보 최초 삽입 및 삽입된 유저 정보 반환 //
  // arg      : CreateUserDTO(userEmail, userName, userProfile, userBirth) //
  // return   : User - 사용자 정보 //
  async createUser(createUserDto: CreateUserDTO): Promise<User> {
    // description : dto가 담고 있는 사용자 정보를 비구조화 //
    const { userEmail, userName, userProfile, userBirth } = createUserDto;
    // description : 최초 정보입력으로 userEmail, userName, userProfile, userBirth이외에는 null로 생성 //
    const user: User = {
      userEmail,
      userName,
      userProfile,
      userBirth,
      userTel: null,
      userType: null,
      companyNumber: null,
    };
    // description : 생성된 사용자 객체 삽입 //
    const insertedUser = await this.userModel.create(user);

    return insertedUser;
  }

  // function : userEmail로 사용자 조회 //
  // arg      : userEmail - 사용자 //
  // return   : User - 유저 정보 //
  async readUser(userEmail: string): Promise<User> {
    const user = await this.userModel.findOne({ userEmail }).exec();
    console.log(user);
    return user;
  }

  // function : 사용자의 사업자등록번호 수정 //
  // arg      : userEmail - 사용자 이메일, businessRegistrationNumber - 사업자등록번호 //
  // return   : void //
  async updateBusinessRegistrationNumber(
    userEmail: string,
    businessRegistrationNumber: string,
  ): Promise<void> {
    await this.userModel
      .updateOne({ userEmail }, { companyNumber: businessRegistrationNumber })
      .exec();
  }

  // function : 사용자의 사업자등록번호와 직책을 함께 수정 //
  // arg      : userEmail - 사용자 이메일, businessRegistrationNumber - 사업자등록번호 //
  // return   : void //
  async updateUserForCompanyAdmin(
    userEmail: string,
    businessRegistrationNumber: string,
  ): Promise<void> {
    const userType = UserType.REPRESENTATIVE;
    await this.userModel
      .updateOne({ userEmail }, { businessRegistrationNumber, userType })
      .exec();
  }

  async makeSuperAccount() {
    this.userModel.create({
      userEmail: 'hippo2005@gmail.com',
      userName: '박준영',
      userProfile: '',
      userBirth: '',
      userTel: null,
      companyNumber: '0000000000',
      userType: UserType.REPRESENTATIVE,
      workingStatus: null,
    });
  }
}
