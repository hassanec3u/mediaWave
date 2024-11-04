import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPostDto';
import { Observable } from 'rxjs';
import { PostEntity } from './entity/PostEntity';
import { AuthGuard } from '../auth/AuthGuard';

@ApiTags('posts')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('')
  @ApiOperation({ summary: 'Créer un nouveau post' })
  @ApiResponse({ status: 201, description: 'Le post a été créé avec succès.', type: PostEntity })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  @ApiBody({ type: CreatePostDto })
  savePost(@Body() createPostDto: CreatePostDto): Observable<PostEntity> {
    return this.postsService.savePost(createPostDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Mettre à jour un post existant' })
  @ApiResponse({ status: 200, description: 'Le post a été mis à jour avec succès.', type: PostEntity })
  @ApiResponse({ status: 404, description: 'Post non trouvé.' })
  @ApiParam({ name: 'id', description: 'ID du post à mettre à jour' })
  @ApiBody({ type: CreatePostDto })
  updatePost(@Param('id') id: string, @Body() post: CreatePostDto): Observable<PostEntity> {
    return this.postsService.updatePost(id, post);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Supprimer un post' })
  @ApiResponse({ status: 200, description: 'Le post a été supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Post non trouvé.' })
  @ApiParam({ name: 'id', description: 'ID du post à supprimer' })
  deletePost(@Param('id') id: string): Observable<void> {
    return this.postsService.deletePost(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Trouver un post par ID' })
  @ApiResponse({ status: 200, description: 'Le post a été trouvé.', type: PostEntity })
  @ApiResponse({ status: 404, description: 'Post non trouvé.' })
  @ApiParam({ name: 'id', description: 'ID du post à trouver' })
  findPostById(@Param('id') id: string): Observable<PostEntity> {
    return this.postsService.findPostById(id);
  }
}