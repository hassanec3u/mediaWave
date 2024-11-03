import {Controller, Get, Post, Body, Param, Delete} from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CreateCommentDto } from './dto/createCommentDto';
import {Observable} from "rxjs";
import {CommentEntity} from "./entity/CommentEntity";

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post('')
    create(@Body() createCommentDto: CreateCommentDto): Observable<CommentEntity> {
        return this.commentsService.create(createCommentDto);
    }

    @Get(':postId')
    getAllCommentsForAPost(@Param('postId') postId: string): Observable<CommentEntity[]> {
        console.log('Get all comments for post:', postId);
        return this.commentsService.getAllCommentsForAPost(postId);
    }

    @Delete(':id')
    delete(@Param('id') id: string): void {
        this.commentsService.deleteComment(id);
    }
}