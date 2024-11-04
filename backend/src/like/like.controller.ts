import {Controller, Post, Delete, Param, Req, UseGuards, Get} from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from '../auth/AuthGuard';
import {Observable} from "rxjs";

@UseGuards(AuthGuard)
@Controller('likes')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @UseGuards(AuthGuard)
    @Post(':postId/user/:userId')
    likePost(@Param('userId') userId: string, @Param('postId') postId: string): void{
        console.log("je suis dans likePost");
        return this.likeService.likePost(userId, postId);
    }

    @Delete(':postId/user/:userId')
    unlikePost(@Param('userId') userId: string, @Param('postId') postId: string): void {
        console.log("je suis dans unlikePost");
        return this.likeService.unlikePost(userId, postId);
    }

    @Get(':postId')
    getNumberOfLikes(@Param('postId') postId: string): Observable<number> {
        return this.likeService.getNumberOfLikes(postId);
    }

    @Get(':postId/user/:userId/has-liked')
    hasLikedPost(@Param('userId') userId: string, @Param('postId') postId: string): Observable<boolean> {
        return this.likeService.hasLikedPost(userId, postId);
    }
}