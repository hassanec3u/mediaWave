import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import {Post} from "../../posts/schema/postSchema";
import {User} from "../../user/schema/userSchema";

export type UserDocument = Message & Document;

@Schema()
export class Message {


    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    })
    _id: string;

    @Prop({ required: true })
    contenu: string;

    @Prop({ required: true ,ref: 'User' })
    sender: User;

    @Prop({ required: true,ref: 'User' })
    receiver: User;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: false })
    read: boolean;
}
