import { Test, TestingModule } from '@nestjs/testing';
import { GuestBooksService } from './guest-books.service';

describe('GuestBooksService', () => {
  let service: GuestBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuestBooksService],
    }).compile();

    service = module.get<GuestBooksService>(GuestBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
