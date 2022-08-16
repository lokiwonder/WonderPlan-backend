import { Test, TestingModule } from '@nestjs/testing';
import { CompanyRepository } from './company.repository';

describe('CompanyRepository', () => {
  let provider: CompanyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyRepository],
    }).compile();

    provider = module.get<CompanyRepository>(CompanyRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
