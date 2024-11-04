import { Controller, Post, Delete, Param, Get, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from '../auth/AuthGuard';
import { Observable } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('likes')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('likes')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @Post(':postId/user/:userId')
    @ApiOperation({ summary: 'Aimer un post' })
    @ApiResponse({ status: 201, description: 'Le post a été aimé avec succès.' })
    @ApiResponse({ status: 400, description: 'Requête invalide.' })
    @ApiParam({ name: 'userId', description: 'ID de l\'utilisateur' })
    @ApiParam({ name: 'postId', description: 'ID du post' })
    likePost(@Param('userId') userId: string, @Param('postId') postId: string): void {
        return this.likeService.likePost(userId, postId);
    }

    @Delete(':postId/user/:userId')
    @ApiOperation({ summary: 'Ne plus aimer un post' })
    @ApiResponse({ status: 200, description: 'Le post n\'est plus aimé.' })
    @ApiResponse({ status: 404, description: 'Post non trouvé.' })
    @ApiParam({ name: 'userId', description: 'ID de l\'utilisateur' })
    @ApiParam({ name: 'postId', description: 'ID du post' })
    unlikePost(@Param('userId') userId: string, @Param('postId') postId: string): void {
        return this.likeService.unlikePost(userId, postId);
    }

    @Get(':postId')
    @ApiOperation({ summary: 'Obtenir le nombre de likes d\'un post' })
    @ApiResponse({ status: 200, description: 'Nombre de likes récupéré avec succès.' })
    @ApiResponse({ status: 404, description: 'Post non trouvé.' })
    @ApiParam({ name: 'postId', description: 'ID du post' })
    getNumberOfLikes(@Param('postId') postId: string): Observable<number> {
        return this.likeService.getNumberOfLikes(postId);
    }

    @Get(':postId/user/:userId/has-liked')
    @ApiOperation({ summary: 'Vérifier si un utilisateur a aimé un post' })
    @ApiResponse({ status: 200, description: 'Statut de like récupéré avec succès.' })
    @ApiResponse({ status: 404, description: 'Post ou utilisateur non trouvé.' })
    @ApiParam({ name: 'userId', description: 'ID de l\'utilisateur' })
    @ApiParam({ name: 'postId', description: 'ID du post' })
    hasLikedPost(@Param('userId') userId: string, @Param('postId') postId: string): Observable<boolean> {
        return this.likeService.hasLikedPost(userId, postId);
    }
}