import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

// class: 회원 정보  Schema Class //
@Schema()
export class User {
  @Prop()
  userEmail: string;

  @Prop()
  userName: string;

  @Prop()
  userProfile: string;

  @Prop()
  userBirth: string;

  @Prop()
  userTel: string;

  @Prop()
  companyNumber: string;

  @Prop()
  userType: string;
}

// schema: 유저 스키마 //
export const UserSchema = SchemaFactory.createForClass(User);
