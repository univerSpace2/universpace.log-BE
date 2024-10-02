import { Module } from '@nestjs/common';
import { GuestBooksService } from './guest-books.service';
import { GuestBooksController } from './guest-books.controller';

@Module({
  controllers: [GuestBooksController],
  providers: [GuestBooksService],
})
export class GuestBooksModule {}
