import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IRoom } from 'src/chat/interface/room.interface';
import { User } from './user.schema';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop()
  user: User;

  @Prop()
  message: string;

  @Prop()
  room: IRoom;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
