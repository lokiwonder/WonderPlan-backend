import { Test, TestingModule } from '@nestjs/testing';
import { VacationRepository } from './vacation-repository';

describe('VacationRepository', () => {
  let provider: VacationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VacationRepository],
    }).compile();

    provider = module.get<VacationRepository>(VacationRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
