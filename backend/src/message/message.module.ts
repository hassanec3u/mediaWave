import {Module} from '@nestjs/common';
import {MessagesGateway} from "../gateways/websocket.gateway";
import {Message, MessageSchema} from "./schema/messageSchema";
import {MessageDao} from "./dao/MessageDao";
import {MessagesController} from "./message.controller";
import {MessageService} from "./message.service";
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{name: Message.name, schema: MessageSchema}]),
    ],
    providers: [MessageDao, MessageService, MessagesGateway],
    controllers: [MessagesController]
})
export class MessagesModule {
}