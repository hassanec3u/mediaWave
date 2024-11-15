// src/conversations/conversation.dao.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {Conversation} from "../schema/conversationSchema";

@Injectable()
export class ConversationDao {
    constructor(
        @InjectModel(Conversation.name)
        private readonly _conversationModel: Model<Conversation>,
    ) {}


    async findOrCreateConversation(userId1: string, userId2: string): Promise<Conversation> {
        const participants = [new Types.ObjectId(userId1), new Types.ObjectId(userId2)].sort();

        let conversation = await this._conversationModel.findOne({
            participants: { $all: participants },
        });

        if (!conversation) {
            conversation = await this._conversationModel.create({ participants, lastMessage: "" });
        }

        return conversation;
    }

    async updateLastMessage(conversationId: string, messageId: string): Promise<void> {
        await this._conversationModel.findByIdAndUpdate(conversationId, {
            lastMessage: new Types.ObjectId(messageId),
            updatedAt: Date.now(),
        });
    }

    async getUserConversations(userId: string): Promise<Conversation[]> {
        if (!Types.ObjectId.isValid(userId)) {
            throw new BadRequestException('Invalid userId');
        }
        return this._conversationModel.find({participants: new Types.ObjectId(userId)})
            .populate({
                path: 'participants',
                select: 'username',
            })
            .populate('lastMessage')
            .sort({updatedAt: -1});
    }
}
