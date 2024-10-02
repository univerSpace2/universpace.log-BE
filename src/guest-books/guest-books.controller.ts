import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuestBooksService } from './guest-books.service';
import { CreateGuestBookDto } from './dto/create-guest-book.dto';
import { UpdateGuestBookDto } from './dto/update-guest-book.dto';

@Controller('guest-books')
export class GuestBooksController {
  constructor(private readonly guestBooksService: GuestBooksService) {}

  @Post()
  create(@Body() createGuestBookDto: CreateGuestBookDto) {
    return this.guestBooksService.create(createGuestBookDto);
  }

  @Get()
  findAll() {
    return this.guestBooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestBooksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuestBookDto: UpdateGuestBookDto) {
    return this.guestBooksService.update(+id, updateGuestBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestBooksService.remove(+id);
  }
}
