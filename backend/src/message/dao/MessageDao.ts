import {BadRequestException, Injectable, InternalServerErrorException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Message} from "../schema/messageSchema";
import {Model, Types} from "mongoose";
import {CreateMessageDto} from "../dto/createMessageDto";
import {MessagesGateway} from "../../gateways/websocket.gateway";


@Injectable()
export class MessageDao {
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

        await createdMessage.populate([
            { path: 'senderId', select: 'username' },
            { path: 'receiverId', select: 'username' }
        ]);



        // Envoyer via WebSocket Gateway
        this.webSocketGateway.sendMessageToClients(createdMessage);

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
        })
            .populate('senderId', 'username')
            .populate('receiverId', 'username')
            .sort({createdAt: 1});
    }


}