import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ICommutingTime, ICompany, IGeo } from 'src/_commons/interfaces';

export type CompanyDocument = Company & Document;

// class: 회사 정보 Collection Class //
@Schema()
export class Company implements ICompany {
  @Prop()
  businessRegistrationNumber: string;

  @Prop()
  companyName: string;

  @Prop()
  representativeName: string;

  @Prop()
  companyOpeningDate: string;

  @Prop()
  companyAddress: string;

  @Prop({ type: Object })
  companyLocation: IGeo;

  @Prop({ type: Object })
  commutingTime: ICommutingTime;
}

// schema: Company 스키마 //
export const CompanySchema = SchemaFactory.createForClass(Company);
