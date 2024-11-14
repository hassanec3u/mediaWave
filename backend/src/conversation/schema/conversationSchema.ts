import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {Message} from "../../message/schema/messageSchema";


export type ConversationDocument = Conversation & Document;

@Schema()
export class Conversation {
    @Prop({ type: [Types.ObjectId], ref: 'User', required: true })
    participants: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: 'Message' })
    lastMessage: Message;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
