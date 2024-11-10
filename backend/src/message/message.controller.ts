import {Controller, Post, Body, Get, Param, UseGuards} from '@nestjs/common';
import {AuthGuard} from "../auth/AuthGuard";
import {MessagesService} from "./message.service";
import {Message} from "./schema/userSchema";
import {CreateMessageDto} from "./dto/createMessageDto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@UseGuards(AuthGuard)
@ApiBearerAuth()  // Utilisé pour l'authentification avec un token Bearer
@ApiTags('Messages')  // Regroupe les routes sous la catégorie "Messages" dans Swagger
@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    // Créer un message
    @Post()
    async create(@Body() createMessageDto: CreateMessageDto): Promise<void> {
        return this.messagesService.createNewMessage(createMessageDto);
    }

    // Récupérer l'historique des messages entre deux utilisateurs
    @Get(':senderId/:recipientId')
    async findMessages(
        @Param('senderId') senderId: string,
        @Param('recipientId') recipientId: string,
    ): Promise<Message[]> {
        return this.messagesService.getMessages(senderId, recipientId);
    }
}
