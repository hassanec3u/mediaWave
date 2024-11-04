import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Comment, CommentSchema } from './schema/commentSchema';
import {CommentsService} from "./comment.service";
import {CommentsController} from "./comment.controller";
import {CommentDao} from "./dao/commentDao";

@Module({
    imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])],
    providers: [CommentsService, CommentDao],
    controllers: [CommentsController],
})
export class CommentsModule {}