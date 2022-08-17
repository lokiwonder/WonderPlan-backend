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
    private userl: Model<UserDocument>,
  ) {}

  // todo: 반환타입, db 연결 및 명령어 작성 //
  async createUser(createUserDto: CreateUserDTO): Promise<User> {
    const { userEmail, userName, userProfile, userBirth } = createUserDto;
    const user: User = {
      userEmail,
      userName,
      userProfile,
      userBirth,
      userTel: null,
      userType: null,
      companyNumber: null,
    };
    await this.userl.insertMany(user);
    const insertedUser = this.readUser(userEmail);
    return insertedUser;
  }

  // todo: 반환타입, db 연결 및 명령어 작성 //
  async readUser(userEmail: string): Promise<User> {
    return this.userl.findOne({ userEmail }).exec();
  }
}
