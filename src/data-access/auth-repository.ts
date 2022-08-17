import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  // function: 사용자 검색 //
  // arg     : email
  // return  : User
  readUser(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
}
