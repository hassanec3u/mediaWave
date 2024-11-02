import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import {User} from "../../user/schema/userSchema";

export type UserDocument = Post & Document;

@Schema()
export class Post {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    })
    _id: string;

    @Prop({ required: true})
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop()
    postPicture: string;

    @Prop({ type: Date, default: Date.now })
    postDate: Date;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    publisher: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
