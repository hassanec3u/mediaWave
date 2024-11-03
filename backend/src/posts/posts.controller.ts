import {Body, Controller, Delete, Get, Param, Post, Put, Req} from '@nestjs/common';
import { PostsService } from './posts.service';
import {CreatePostDto} from "./dto/createPostDto";
import {Observable} from "rxjs";
import {PostEntity} from "./entity/PostEntity";

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('')
  savePost(@Body() createPostDto: CreatePostDto): Observable<PostEntity>{
    return this.postsService.savePost(createPostDto);
  }

  @Put('/:id')
  updatePost(@Param('id') id: string, @Body() post: CreatePostDto): Observable<PostEntity> {
    return this.postsService.updatePost(id, post);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string): Observable<void> {
    return this.postsService.deletePost(id);
  }

  @Get('/:id')
  findPostById(@Param('id') id: string): Observable<PostEntity> {
    return this.postsService.findPostById(id);
  }
}
