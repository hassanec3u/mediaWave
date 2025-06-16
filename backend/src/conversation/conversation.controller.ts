import {Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {Conversation} from "./schema/conversationSchema";
import {CreateConversationDto} from "./dto/createConversationDto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "../auth/AuthGuard";
import {ConversationService} from "./conversationService";
import {Observable} from "rxjs";

@UseGuards(AuthGuard)
@Controller('conversation')
@ApiBearerAuth()
@ApiTags('Conversation')
@Controller('conversation')
export class ConversationController {
    constructor(private readonly conservationService : ConversationService ) {}

    @Get(':userId')
    async getUserConversations(@Param('userId') userId: string): Promise<Observable<Conversation[]>> {
        return this.conservationService.getUserConversations(userId);
    }

    //create a new conversation
    @Post()
    async createNewConversation(@Body() conversationDto: CreateConversationDto): Promise<Observable<Conversation>> {
        return this.conservationService.createNewConversation(conversationDto);
    }

    //update the last message of a conversation
    @Put(':conversationId/:messageId')
    async updateLastMessage(@Param('conversationId') conversationId: string, @Param('messageId') messageId: string): Promise<Observable<void>> {
        return this.conservationService.updateLastMessage(conversationId, messageId);
    }
}
