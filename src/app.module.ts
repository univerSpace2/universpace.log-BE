import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { GuestBooksModule } from './guest-books/guest-books.module';


@Module({
  imports: [PostsModule, GuestBooksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
