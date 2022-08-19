import { Test, TestingModule } from '@nestjs/testing';
import { CommuteService } from './commute.service';

describe('CommuteService', () => {
  let service: CommuteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommuteService],
    }).compile();

    service = module.get<CommuteService>(CommuteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
