import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { GuestBooksModule } from './guest-books/guest-books.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [PostsModule, GuestBooksModule, SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
