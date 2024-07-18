import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.postsService.findAll(+page, +limit);
  }

  @Get('feed')
  getPublishedPosts(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.postsService.getPublishedPosts(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch('publish/:id')
  publish(@Param('id') id: string) {
    return this.postsService.publish(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
