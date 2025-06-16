import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateMessageDto {

    //pour le id de la conversation
     @ApiProperty({ example: '60c72b2f9b1e8b001c8e4d3a', description: 'ID de la conversation' })
    @IsNotEmpty()
    @IsString()
    conversationId: string;

    @ApiProperty({ example: 'Hello', description: 'Contenu du message' })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({ example: 'JohnDoe', description: 'Nom d\'utilisateur' })
    @IsNotEmpty()
    @IsString()
    senderId: string;

    @ApiProperty({ example: 'JaneDoe', description: 'Nom d\'utilisateur' })
    @IsNotEmpty()
    @IsString()
    receiverId: string;


}