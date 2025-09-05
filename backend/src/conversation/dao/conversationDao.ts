// src/conversations/conversation.dao.ts
import {Injectable, BadRequestException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Conversation} from "../schema/conversationSchema";
import {User} from "../../user/schema/userSchema";

@Injectable()
export class ConversationDao {
    constructor(
        @InjectModel(Conversation.name)
        private readonly _conversationModel: Model<Conversation>,
        @InjectModel(User.name)
        private readonly _UserModel: Model<User>,
    ) {
    }


    async createConversation(SenderID: string, receiverUsername: string): Promise<Conversation> {
        //On vérifie que l'ID est valide
        if (!Types.ObjectId.isValid(SenderID)) {
            console.error('Invalid SenderID:', SenderID);
            throw new BadRequestException('Invalid SenderID');
        }

        //on crée un tableau de participants avec l'ID de l'envoyeur
        const participants = [new Types.ObjectId(SenderID)];

        //On cherche l'utilisateur avec le username du destinataire
        const otherUser = await this._UserModel.findOne({username: receiverUsername});


        //Si l'utilisateur n'existe pas, on renvoie une erreur
        if (!otherUser) {
            console.error('User not found ' + receiverUsername);
            throw new BadRequestException('User not found');
        }

        //On vérifie que l'utilisateur n'essaie pas de créer une conversation avec lui-même
        if (otherUser._id.toString() === SenderID) {
            console.error('Cannot create a conversation with oneself.');
            throw new BadRequestException('Cannot create a conversation with oneself.');
        }


        participants.push(new Types.ObjectId(otherUser._id.toString()));

        let conversation = await this._conversationModel.findOne({
            participants: {$all: participants},
        });

        if (!conversation) {
            conversation = await this._conversationModel.create({participants, lastMessage: null});
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
            console.error('userId:', userId);
            throw new BadRequestException('Invalid userId');
        }

        const UserID = new Types.ObjectId(userId);

        return this._conversationModel.find({
            participants: { $in: UserID },
        })
            .populate({
                path: 'participants',
                select: 'username',
            })
            .populate('lastMessage')
            .sort({updatedAt: -1});
    }
}
