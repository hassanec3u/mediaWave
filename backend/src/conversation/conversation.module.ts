import {Module} from "@nestjs/common";
import {AuthModule} from "../auth/auth.module";
import {MongooseModule} from "@nestjs/mongoose";
import {MessagesController} from "../message/message.controller";
import {Conversation, ConversationSchema} from "./schema/conversationSchema";
import {ConversationDao} from "./dao/conversationDao";
import {ConversationService} from "./conversationService";
import {ConversationController} from "./conversation.controller";

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{name: Conversation.name, schema: ConversationSchema}]),
    ],
    providers: [ConversationDao, ConversationService],
    controllers: [ConversationController]
})
export class ConversationModule {
}