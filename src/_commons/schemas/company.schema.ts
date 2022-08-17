import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ICommutingTime } from '../interfaces/CommutingTime.interface';
import { ICompany } from '../interfaces/Company.interface';
import { IGeo } from '../interfaces/geo.interface';

export type CompanyDocument = Company & Document;

// class: 회사 정보 Schema Class //
@Schema()
export class Company implements ICompany {
  @Prop()
  businessRegistrationNumber: string;

  @Prop()
  companyName: string;

  @Prop()
  representativeEmail: string;

  @Prop()
  companyOpeningData: string;

  @Prop()
  companyAddress: string;

  @Prop()
  companyLocation: IGeo;

  @Prop()
  commutingTime: ICommutingTime;
}

// schema: 회사 스키마 //
export const CompanySchema = SchemaFactory.createForClass(Company);
