import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { Category } from './entities/category.entity';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { PostRepository } from './repositories/post.repository';
import { CategoryRepository } from './repositories/category.repository';
import { UVLogger } from 'src/shared/logger/logger.service';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([Post, Category])],
  controllers: [PostsController],
  providers: [PostsService, PostRepository, CategoryRepository, UVLogger],
  exports: [PostsService],
})
export class PostsModule {}
