import { BadRequestException, Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDTO } from './dto';

@Injectable()
export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  // todo: 반환타입: interface 작성하기 //
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
      return this.companyRepository.createCompany(company);
    } else {
      throw new BadRequestException(
        `already inserted company with businessRegistrationNumber ${businessRegistrationNumber}`,
      );
    }
  }
}
