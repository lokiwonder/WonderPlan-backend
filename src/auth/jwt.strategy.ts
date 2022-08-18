import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/data-access/schemas';
import { UserDocument } from 'src/data-access/schemas/user.schema';
import { JWT_SECRET } from './constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {
    super({
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { userEmail } = payload;
    const user = await this.userModel.findOne({ userEmail });

    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
