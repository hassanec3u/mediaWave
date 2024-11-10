import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Message} from "../schema/userSchema";
import {Model} from "mongoose";
import {CreateMessageDto} from "../dto/createMessageDto";


@Injectable()
export class MessageDao {
    constructor(
        @InjectModel(Message.name)
        private readonly _messageModel: Model<Message>,
        //private readonly webSocketGateway: WebSocketGateway,


    ) {
    }


    async createNewMessage (message: CreateMessageDto): Promise<Message> {
        const newMessage = new this._messageModel(CreateMessageDto);

       return  newMessage.save().then((r: Message) => {

           // this.webSocketGateway.sendMessageToClients(createMessageDto);

            return r;
        }).catch(err => {
            console.error('Error saving message:', err);
            throw err;
        });
    }

    async getMessages(senderId: string, receiverId: string): Promise<Message[]> {
        return this._messageModel.find({
            $or: [
                {sender: senderId, receiver: receiverId},
                {sender: receiverId, receiver: senderId}
            ]
        }).sort({createdAt: 1})
    }


}