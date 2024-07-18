import {
  HttpCode,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number): Promise<Post | null> {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ posts: Post[]; total: number }> {
    const offset = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        skip: offset,
        take: limit,
        include: {
          author: true,
        },
      }),
      this.prisma.post.count(),
    ]);

    return { posts, total };
  }

  async getPublishedPosts(
    page: number,
    limit: number,
  ): Promise<{ posts: Post[]; total: number }> {
    const offset = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where: {
          published: true,
        },
        skip: offset,
        take: limit,
      }),
      this.prisma.post.count({
        where: {
          published: true,
        },
      }),
    ]);

    return { posts, total };
  }

  async create(dto: CreatePostDto): Promise<Post> {
    // Desestruturando para pegar authorEmail de dto: CreatePostDto
    const { authorEmail } = dto;

    // Deletando a propriedade authorEmail de dto: CreatePostDto
    delete dto.authorEmail;

    const data: Prisma.PostCreateInput = {
      // Para não acontecer conflitos no momento dessa desestruturação
      ...dto,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    };

    return this.prisma.post.create({
      data,
    });
  }

  async update(id: number, dto: UpdatePostDto): Promise<Post> {
    await this.findOne(id);

    const data: Prisma.PostUpdateInput = {
      ...dto,
    };

    const updatedPost = await this.prisma.post.update({
      where: {
        id,
      },
      data,
    });

    return updatedPost;
  }

  async publish(id: number): Promise<Post> {
    const post = await this.findOne(id);

    if (post.published) {
      throw new NotAcceptableException('Post already published');
    }

    const publishedPost = await this.prisma.post.update({
      where: {
        id,
      },
      data: {
        published: true,
      },
    });

    return publishedPost;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
