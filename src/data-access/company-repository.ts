import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './schemas';
import { CompanyDocument } from './schemas/company.schema';

// repository : Company Collection 관련 Repository //
@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<CompanyDocument>,
  ) {}

  // function : 회사 등록 //
  // arg      : Company() //
  // return   : Company - 회사 정보 //
  async createCompany(company: Company): Promise<Company> {
    const { businessRegistrationNumber } = company;
    try {
      // description : arg로 받은 회사 정보 등록 //
      await this.companyModel.create(company);
      // description : 등록된 회사 정보를 사업자등록번호로 조회 //
      const createdCompany = this.readCompany(businessRegistrationNumber);

      return createdCompany;
    } catch (e) {
      throw new ServiceUnavailableException();
    }
  }

  // function : 회사 조회 //
  // arg      : businessRegistrationNumber - 사업자등록번호 //
  // return   : Company - 회사 정보 //
  async readCompany(businessRegistrationNumber: string): Promise<Company> {
    try {
      // description : 사업자등록번호로 회사 정보 조회 //
      const company: Company = await this.companyModel
        .findOne({ businessRegistrationNumber })
        .exec();
      return company;
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  // function : 회사 목록 조회 //
  // return   : Company[] - 회사 정보 목록 //
  async readCompanyList(): Promise<Company[]> {
    try {
      // description : 등록된 모든 회사 조회 //
      const companyList = this.companyModel.find().exec();
      return companyList;
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
