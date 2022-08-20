import { Test, TestingModule } from '@nestjs/testing';
import { CalendarRepository } from './calendar-repository';

describe('CalendarRepository', () => {
  let provider: CalendarRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalendarRepository],
    }).compile();

    provider = module.get<CalendarRepository>(CalendarRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
