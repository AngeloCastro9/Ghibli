import { Test, TestingModule } from '@nestjs/testing';
import { GhibliController } from './ghibli.controller';

describe('GhibliController', () => {
  let controller: GhibliController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GhibliController],
    }).compile();

    controller = module.get<GhibliController>(GhibliController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
