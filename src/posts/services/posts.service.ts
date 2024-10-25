import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { formatDate } from '../../shared/utils';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Category } from '../entities/category.entity';
import { Post } from '../entities/post.entity';
import { UVLogger } from 'src/shared/logger/logger.service';
import { PostRepository } from '../repositories/post.repository';
import { CategoryRepository } from '../repositories/category.repository';
import { plainToInstance } from 'class-transformer';

const DUMMY_CATEGORIES: Category[] = [
  {
    id: 1,
    category: '백엔드',
  },
  {
    id: 2,
    category: 'NestJS',
  },
  {
    id: 3,
    category: 'Docker',
  },
];
const DUMMY_POSTS: Post[] = [
  {
    id: 1,
    title: 'NestJS 시작하기',
    content: 'NestJS 시작하기에 대한 내용',
    views: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    categories: [DUMMY_CATEGORIES[0], DUMMY_CATEGORIES[1]],
  },
  {
    id: 2,
    title: 'Docker 시작하기',
    content: 'Docker 시작하기에 대한 내용',
    views: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    categories: [DUMMY_CATEGORIES[0], DUMMY_CATEGORIES[2]],
  },
  {
    id: 3,
    title: 'NestJS 프로젝트 생성하기',
    content: 'NestJS 프로젝트 생성하기에 대한 내용',
    views: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    categories: [DUMMY_CATEGORIES[1]],
  },
  {
    id: 4,
    title: 'Docker 이미지 생성하기',
    content: 'Docker 이미지 생성하기에 대한 내용',
    views: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    categories: [DUMMY_CATEGORIES[2]],
  },
];

@Injectable()
export class PostsService {
  private posts: Post[] = DUMMY_POSTS;
  private categories: Category[] = DUMMY_CATEGORIES;

  constructor(
    private readonly postRepository: PostRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly logger: UVLogger,
  ) {
    this.logger.setContext(PostsService.name);
  }

  async create(createPostDto: CreatePostDto): Promise<number> {
    const post = plainToInstance(Post, createPostDto);
    const createdPost = await this.postRepository.save(post);
    return createdPost.id;
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAllPosts();
  }

  async findOne(id: number): Promise<Post> {
    return await this.postRepository.getById(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<number> {
    const post = await this.findOne(id);
    const updatedPost = plainToInstance(Post, {
      ...post,
      ...updatePostDto,
    });
    await this.postRepository.save(updatedPost);
    return updatedPost.id;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.postRepository.delete(id);
  }
}
