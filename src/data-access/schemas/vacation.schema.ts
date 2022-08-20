import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VacationDocument = Vacation & Document;

export class Vacation {
  @Prop()
  userEmail: string;

  @Prop()
  requestDate: string;

  @Prop()
  startDateTime: string;

  @Prop()
  endDateTime: string;
}

export const VacationSchema = SchemaFactory.createForClass(Vacation);
