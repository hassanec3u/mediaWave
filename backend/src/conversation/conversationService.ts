import {Injectable, UnprocessableEntityException} from "@nestjs/common";
import {Conversation} from "./schema/conversationSchema";
import {ConversationDao} from "./dao/conversationDao";
import {CreateConversationDto} from "./dto/createConversationDto";


@Injectable()
export class ConversationService {
    constructor(private readonly conversationDao: ConversationDao) {
    }

    //create a new conversation
    async createNewConversation(conversationDto: CreateConversationDto): Promise<void> {
        const { senderId, receiverUsername } = conversationDto;
        this.conversationDao.createConversation(senderId,receiverUsername).catch(err => {
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