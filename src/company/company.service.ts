import { BadRequestException, Injectable } from '@nestjs/common';
import { CompanyRepository } from 'src/data-access/company-repository';
import { Company } from 'src/data-access/schemas';
import { CreateCompanyDTO } from './dto';

@Injectable()
export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  // function : 회사 정보 생성 및 삽입 //
  // arg      : CreateCompanyDTO //
  // return   : Company //
  // todo : 로직 작성 및 반환타입 작성 필요 //
  createCompany(dto: CreateCompanyDTO) {
    const {
      businessRegistrationNumber,
      companyOpeningDate,
      representativeName,
    } = dto;
    const readedCompany = this.companyRepository.readCompany(
      businessRegistrationNumber,
    );
    if (readedCompany === null || readedCompany === undefined) {
      // 해당 사업자등록번호로 insert된 company가 없으므로 insert
      const company = {
        businessRegistrationNumber,
        companyOpeningDate,
        representativeName,
      };
      // return this.companyRepository.createCompany(company);
    } else {
      throw new BadRequestException(
        `already inserted company with businessRegistrationNumber ${businessRegistrationNumber}`,
      );
    }
  }
}
