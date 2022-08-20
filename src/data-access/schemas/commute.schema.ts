import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { WorkingStatus } from 'src/_commons/classes';

export type CommuteDocument = Commute & Document;

@Schema()
export class Commute {
  // description: 사용자 이메일 //
  @Prop()
  userEmail: string;

  // description: 사업자 등록번호 //
  @Prop()
  businessRegistrationNumber: string;

  // description: 출퇴근 일자 //
  @Prop()
  date: string;

  // description: 시작 시각 //
  @Prop()
  startTime: string;

  // description: 종료 시각 //
  @Prop()
  endTime: string;

  // description: 근무 상태 //
  @Prop()
  workingStatus: WorkingStatus;

  // description: 기타 사항 //
  @Prop()
  description: string;
}

export const CommuteSchema = SchemaFactory.createForClass(Commute);
