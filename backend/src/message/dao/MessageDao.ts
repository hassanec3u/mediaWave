import {BadRequestException, Injectable, InternalServerErrorException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Message} from "../schema/messageSchema";
import {Model, Types} from "mongoose";
import {CreateMessageDto} from "../dto/createMessageDto";
import {MessagesGateway} from "../../gateways/websocket.gateway";
import {ConversationDao} from "../../conversation/dao/conversationDao";


@Injectable()
export class MessageDao {
    function

    constructor(
        @InjectModel(Message.name)
        private readonly _messageModel: Model<Message>,
     //   private readonly conversationDao: ConversationDao,
        private readonly webSocketGateway: MessagesGateway,
    ) {
    }

    isValidObjectId(id: string): boolean {
        return Types.ObjectId.isValid(id);
    }

    async createNewMessage(messageDto: CreateMessageDto): Promise<Message> {
        if (!this.isValidObjectId(messageDto.senderId) || !this.isValidObjectId(messageDto.receiverId)) {
            throw new BadRequestException('Invalid senderId or receiverId');
        }

        const message = {
            ...messageDto,
            senderId: new Types.ObjectId(messageDto.senderId),
            receiverId: new Types.ObjectId(messageDto.receiverId),
        };

        const createdMessage = await this._messageModel.create(message);

    /*    // Trouver ou créer la conversation entre les deux utilisateurs
        const conversation = await this.conversationDao.findOrCreateConversation(
            messageDto.senderId,
            messageDto.receiverId,
        );
*/
        // Mettre à jour le dernier message de la conversation
        //await this.conversationDao.updateLastMessage(conversation._id.toString(), createdMessage._id.toString());

        // Envoyer le message via WebSocket
        this.webSocketGateway.sendMessageToClients(messageDto);

        return createdMessage;
    }



    async getMessages(senderId: string, receiverId: string): Promise<Message[]> {
        if (!this.isValidObjectId(senderId) || !this.isValidObjectId(receiverId)) {
            throw new BadRequestException('Invalid senderId or receiverId');
        }
        return this._messageModel.find({
            $or: [
                {senderId: new Types.ObjectId(senderId), receiverId: new Types.ObjectId(receiverId)},
                {senderId: new Types.ObjectId(receiverId), receiverId: new Types.ObjectId(senderId)}
            ]
        }).sort({createdAt: 1})
    }


}