import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async findAllPosts(): Promise<Post[]> {
    return this.find();
  }

  async findPostById(id: number): Promise<Post> {
    return this.findOneBy({ id });
  }
  async getById(id: number): Promise<Post> {
    const post = await this.findOneBy({ id });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }
  async findByCategory(category: string): Promise<Post[]> {
    return this.find({
      where: { categories: { category } },
      relations: ['categories'],
    });
  }
}
