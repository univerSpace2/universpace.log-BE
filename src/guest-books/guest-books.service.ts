import { Injectable } from '@nestjs/common';
import { CreateGuestBookDto } from './dto/create-guest-book.dto';
import { UpdateGuestBookDto } from './dto/update-guest-book.dto';

@Injectable()
export class GuestBooksService {
  create(createGuestBookDto: CreateGuestBookDto) {
    return 'This action adds a new guestBook';
  }

  findAll() {
    return `This action returns all guestBooks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guestBook`;
  }

  update(id: number, updateGuestBookDto: UpdateGuestBookDto) {
    return `This action updates a #${id} guestBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} guestBook`;
  }
}
