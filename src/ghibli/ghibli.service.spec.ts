import { Test, TestingModule } from '@nestjs/testing';
import { GhibliService } from './ghibli.service';

describe('GhibliService', () => {
  let service: GhibliService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GhibliService],
    }).compile();

    service = module.get<GhibliService>(GhibliService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
