import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { formatDate } from 'src/utils/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Category } from './entities/category.entity';
import { Post } from './entities/post.entity';

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

  create(createPostDto: CreatePostDto): null {
    const post = {
      id: this.posts.length + 1,
      ...createPostDto,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      categories: [],
    };
    this.posts.push(post);
    return null;
  }

  findAll(): Omit<Post, 'createdAt' | 'updatedAt'>[] {
    return this.posts.map((post) => ({
      ...post,
      createdAt: formatDate(post.createdAt as Date),
      updatedAt: formatDate(post.updatedAt as Date),
    }));
  }

  findOne(id: number): Post {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return {
      ...post,
      createdAt: formatDate(post.createdAt as Date),
      updatedAt: formatDate(post.updatedAt as Date),
    };
  }

  update(id: number, updatePostDto: UpdatePostDto): null {
    const post = this.findOne(id);
    post.title = updatePostDto.title;
    post.content = updatePostDto.content;
    post.updatedAt = formatDate(new Date());
    return null;
  }

  remove(id: number): null {
    this.findOne(id);
    this.posts = this.posts.filter((post) => post.id !== id);
    return null;
  }
}
