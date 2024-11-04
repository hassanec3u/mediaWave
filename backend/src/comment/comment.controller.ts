import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CreateCommentDto } from './dto/createCommentDto';
import { Observable } from 'rxjs';
import { CommentEntity } from './entity/CommentEntity';
import { AuthGuard } from '../auth/AuthGuard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('comments')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post('')
    @ApiOperation({ summary: 'Créer un commentaire' })
    @ApiResponse({ status: 201, description: 'Commentaire créé avec succès.', type: CommentEntity })
    @ApiResponse({ status: 400, description: 'Requête invalide.' })
    create(@Body() createCommentDto: CreateCommentDto): Observable<CommentEntity> {
        return this.commentsService.create(createCommentDto);
    }

    @Get(':postId')
    @ApiOperation({ summary: 'Obtenir tous les commentaires pour un post' })
    @ApiResponse({ status: 200, description: 'Commentaires récupérés avec succès.', type: [CommentEntity] })
    @ApiResponse({ status: 404, description: 'Post non trouvé.' })
    @ApiParam({ name: 'postId', description: 'ID du post' })
    getAllCommentsForAPost(@Param('postId') postId: string): Observable<CommentEntity[]> {
        console.log('Get all comments for post:', postId);
        return this.commentsService.getAllCommentsForAPost(postId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Supprimer un commentaire' })
    @ApiResponse({ status: 200, description: 'Commentaire supprimé avec succès.' })
    @ApiResponse({ status: 404, description: 'Commentaire non trouvé.' })
    @ApiParam({ name: 'id', description: 'ID du commentaire' })
    delete(@Param('id') id: string): void {
        this.commentsService.deleteComment(id);
    }
}