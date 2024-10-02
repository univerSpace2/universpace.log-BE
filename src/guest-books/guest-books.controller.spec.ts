import { Test, TestingModule } from '@nestjs/testing';
import { GuestBooksController } from './guest-books.controller';
import { GuestBooksService } from './guest-books.service';

describe('GuestBooksController', () => {
  let controller: GuestBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuestBooksController],
      providers: [GuestBooksService],
    }).compile();

    controller = module.get<GuestBooksController>(GuestBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
