import { Test, TestingModule } from '@nestjs/testing';
import { CommuteController } from './commute.controller';

describe('CommuteController', () => {
  let controller: CommuteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommuteController],
    }).compile();

    controller = module.get<CommuteController>(CommuteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
