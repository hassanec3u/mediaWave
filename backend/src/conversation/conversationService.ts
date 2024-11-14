import {Injectable, UnprocessableEntityException} from "@nestjs/common";
import {Conversation} from "./schema/conversationSchema";
import {ConversationDao} from "./dao/conversationDao";


@Injectable()
export class ConversationService {
    constructor(private readonly conversationDao: ConversationDao) {
    }

    //create a new conversation
    async createNewConversation(conversationDto: any): Promise<void> {
        const { userId, otherUserId } = conversationDto;
        this.conversationDao.findOrCreateConversation(userId,otherUserId).catch(err => {
            console.error('Error saving conversation:', err);
            throw new UnprocessableEntityException(err.message);
        });
    }

    async updateLastMessage(conversationId: string, messageId: string): Promise<void> {
        try {
            await this.conversationDao.updateLastMessage(conversationId, messageId);
        } catch (err) {
            console.error('Error updating last message:', err);
            throw new UnprocessableEntityException(err.message);
        }
    }

    async getUserConversations(userId: string): Promise<Conversation[]> {
        try {
            return await this.conversationDao.getUserConversations(userId);
        } catch (err) {
            console.error('Error getting conversations:', err);
            throw new UnprocessableEntityException(err.message);
        }
    }
}