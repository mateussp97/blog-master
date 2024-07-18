import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { Post } from '../entities/post.entity';

export class CreatePostDto implements Post {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsEmail()
  authorEmail: string;
}
