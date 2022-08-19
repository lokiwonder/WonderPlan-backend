import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserType } from 'src/_commons/interfaces/UserType.interface';
import { Company, User } from './schemas';
import { CompanyDocument } from './schemas/company.schema';

// repository : Company Collection 관련 Repository //
@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<CompanyDocument>,

    @InjectModel(User.name)
    private userModel: Model<User>,
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
  // return   : Company(사업자등록번호, 회사명, 개업일, 대표자 성명, 회사 주소, 회사 좌표, 출퇴근시간) - 회사 정보 //
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

  // function : 회사에 가입을 신청한 사용자 목록 조회 //
  async readJoinCompanyRequestList(companyNumber: string): Promise<User[]> {
    try {
      // description : 요청자(관리자)와 사업자등록번호가 같으면서 직책이 없는 사용자 목록 조회 //
      const userList = await this.userModel
        .find({ $and: [{ companyNumber }, { userType: null }] })
        .exec();
      return userList;
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  // function : 선택한 사용자의 회사 가입 승인 //
  // arg      : targetUserEmail - 승인 대상 사용자 이메일, userType - 설정할 사용자의 직책(STAFF) //
  // return   : boolean - 수정 성공 여부 //
  async updateUserType(
    targetUserEmail: string,
    userType: UserType,
  ): Promise<boolean> {
    try {
      // description : 승인 대상 사용자의 직책을 STAFF로 수정 //
      const result = await this.userModel.updateOne(
        { userEmail: targetUserEmail },
        { $set: { userType: userType } },
      );
      return result.modifiedCount === 1;
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  // function : 선택한 사용자의 회사 가입 거절 //
  // arg      : targetUserEmail - 승인 대상 사용자 이메일 //
  // return   : boolean - 수정 성공 여부 //
  async updateUserCompanyName(targetUserEmail: string): Promise<boolean> {
    try {
      // description : 거절 대상 사용자의 사업자등록번호를 null로 수정 //
      const result = await this.userModel.updateOne(
        { userEmail: targetUserEmail },
        { $set: { companyNumber: null } },
      );
      return result.modifiedCount === 1;
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
