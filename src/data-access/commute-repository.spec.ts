import { Test, TestingModule } from '@nestjs/testing';
import { CommuteRepository } from './commute-repository';

describe('CommuteRepository', () => {
  let provider: CommuteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommuteRepository],
    }).compile();

    provider = module.get<CommuteRepository>(CommuteRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
