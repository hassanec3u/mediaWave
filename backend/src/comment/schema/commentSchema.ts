import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/userSchema';
import { Post } from '../../posts/schema/postSchema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    })
    _id: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    author: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
    post: Post;

    @Prop({ required: true })
    content: string;

    @Prop({ default: Date.now })
    createdAt: Date;



}

export const CommentSchema = SchemaFactory.createForClass(Comment);