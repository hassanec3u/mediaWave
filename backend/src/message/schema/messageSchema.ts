import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import * as mongoose from 'mongoose';
import {User} from "../../user/schema/userSchema";

export type MessageDocument = Message & Document;

@Schema()
export class Message {


    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    })
    _id: string;

    @Prop({ required: true })
    content: string;

    @Prop({type : Types.ObjectId , required: true ,ref: 'User' })
    senderId: User;

    @Prop({ type : Types.ObjectId , required: true, ref: 'User' })
    receiverId: User;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: false })
    read: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);