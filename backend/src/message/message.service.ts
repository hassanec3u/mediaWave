import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {MessageDao} from "./dao/MessageDao";
import {Message} from "./schema/messageSchema";
import {CreateMessageDto} from "./dto/createMessageDto";

@Injectable()
export class MessageService {
    constructor(private messageDao: MessageDao) {
    }

    createNewMessage(createMessageDto: CreateMessageDto): void {
        this.messageDao.createNewMessage(createMessageDto).catch(err => {
            console.error('Error saving message:', err);
            throw new UnprocessableEntityException(err.message);
        });
    }

    async getMessages(senderId: string, receiverId: string): Promise<Message[]> {
        try {
            //console.log('Getting messages between', senderId, 'and', receiverId);

            return await this.messageDao.getMessages(senderId, receiverId);
        } catch (err) {
            console.error('Error getting messages:', err);
            throw new UnprocessableEntityException(err.message);
        }
    }

}

