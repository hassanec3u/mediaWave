import {Injectable, UnprocessableEntityException} from "@nestjs/common";
import {Conversation} from "./schema/conversationSchema";
import {ConversationDao} from "./dao/conversationDao";
import {CreateConversationDto} from "./dto/createConversationDto";
import {catchError, from, Observable, throwError} from "rxjs";


@Injectable()
export class ConversationService {
    constructor(private readonly conversationDao: ConversationDao) {}

    createNewConversation(conversationDto: CreateConversationDto): Observable<Conversation> {
        const { senderId, receiverUsername } = conversationDto;

        return from(this.conversationDao.createConversation(senderId, receiverUsername)).pipe(
            catchError(err => {
                console.error('Error saving conversation:', err);
                return throwError(() => new UnprocessableEntityException(err.message));
            })
        );
    }

    updateLastMessage(conversationId: string, messageId: string): Observable<void> {
        return from(this.conversationDao.updateLastMessage(conversationId, messageId)).pipe(
            catchError(err => {
                console.error('Error updating last message:', err);
                return throwError(() => new UnprocessableEntityException(err.message));
            })
        );
    }

    getUserConversations(userId: string): Observable<Conversation[]> {
        return from(this.conversationDao.getUserConversations(userId)).pipe(

            catchError(err => {
                console.error('Error getting conversations:', err);
                return throwError(() => new UnprocessableEntityException(err.message));
            })
        );
    }
}