import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRoom } from 'src/chat/interface/room.interface';
import { User } from './schemas';
import { Chat, ChatDocument } from './schemas/chat.schema';

@Injectable()
export class ChatRepository {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
  ) {}

  // function : 사용자가 속한 채팅방 목록 조회 //
  async getRooms(user: User): Promise<IRoom[]> {
    const { userEmail } = user;
    const conditions = { 'user.userEmail': userEmail };
    const chats: Chat[] = await this.chatModel
      .distinct('room.roomId', conditions)
      .exec();
    const rooms: IRoom[] = [];
    chats.forEach((chat: Chat) => {
      const { room } = chat;
      rooms.push(room);
    });
    return rooms;
  }

  async createChat(chat: Chat): Promise<Chat> {
    try {
      await this.chatModel.create(chat);
      return chat;
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async deleteChat(chat: Chat): Promise<boolean> {
    const result = await this.chatModel.deleteOne({ chat }).exec();
    return result.deletedCount > 0;
  }
}
