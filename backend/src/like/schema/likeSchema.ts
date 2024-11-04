import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/userSchema';
import { Post } from '../../posts/schema/postSchema';

export type LikeDocument = Like & Document;

@Schema()
export class Like {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
    post: Post;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const LikeSchema = SchemaFactory.createForClass(Like);