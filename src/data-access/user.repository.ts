import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from 'src/user/dto';
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
      workingStatus: null,
    };
    // description : 생성된 사용자 객체 삽입 //
    await this.userModel.insertMany(user);

    // description : 삽입된 사용자 조회 //
    const insertedUser = this.readUser(userEmail);
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
}
