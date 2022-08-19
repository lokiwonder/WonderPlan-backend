import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommuteDocument = Commute & Document;

@Schema()
export class Commute {
  @Prop()
  userEmail: string;

  @Prop()
  businessRegistrationNumber: string;

  @Prop()
  date: string;

  @Prop()
  startTime: string;

  @Prop()
  endTime: string;

  @Prop()
  workingStatus: string;

  @Prop()
  description: string;
}

export const CommuteSchema = SchemaFactory.createForClass(Commute);
