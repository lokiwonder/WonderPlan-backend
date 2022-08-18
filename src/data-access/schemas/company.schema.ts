import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ICommutingTime, ICompany, IGeo } from 'src/_commons/interfaces';

export type CompanyDocument = Company & Document;

// class: 회사 정보 Collection Class //
@Schema()
export class Company implements ICompany {
  // description : 사업자등록번호 //
  @Prop()
  businessRegistrationNumber: string;

  // description : 회사명 //
  @Prop()
  companyName: string;

  // description : 대표자 성명 //
  @Prop()
  representativeName: string;

  // description : 개업일 //
  @Prop()
  companyOpeningDate: string;

  // description : 회사 주소 //
  @Prop()
  companyAddress: string;

  // description : 회사 좌표 //
  @Prop({ type: Object })
  companyLocation: IGeo;

  // description : 출퇴근 시간 //
  @Prop({ type: Object })
  commutingTime: ICommutingTime;
}

// schema: Company 스키마 //
export const CompanySchema = SchemaFactory.createForClass(Company);
