import {Module} from "@nestjs/common";
import {AuthModule} from "../auth/auth.module";
import {MongooseModule} from "@nestjs/mongoose";
import {Conversation, ConversationSchema} from "./schema/conversationSchema";
import {ConversationDao} from "./dao/conversationDao";
import {ConversationService} from "./conversationService";
import {ConversationController} from "./conversation.controller";
import {User, UserSchema} from "../user/schema/userSchema";

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    providers: [ConversationDao, ConversationService],
    controllers: [ConversationController]
})
export class ConversationModule {
}