import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {UserDao} from "../user/dao/UserDao";
import {MessageDao} from "./dao/MessageDao";
import {Message} from "./schema/userSchema";
import {CreateMessageDto} from "./dto/createMessageDto";

@Injectable()
export class MessagesService {
    constructor(private messageDao: MessageDao) {
    }

    createNewMessage(createMessageDto: CreateMessageDto): void {
        this.messageDao.createNewMessage(createMessageDto).catch(err => {
            console.error('Error saving message:', err);
            throw new UnprocessableEntityException(err.message);
        });
    }

    getMessages(senderId: string, receiverId: string): Promise<Message[]> {
        return this.messageDao.getMessages(senderId, receiverId).catch(err => {
                console.error('Error getting messages:', err);
                throw new UnprocessableEntityException(err.message);
            }
        );
    }

}
