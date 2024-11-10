import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateMessageDto {

    @ApiProperty({ example: 'Hello', description: 'Contenu du message' })
    @IsNotEmpty()
    @IsString()
    contenu: string;

    @ApiProperty({ example: 'JohnDoe', description: 'Nom d\'utilisateur' })
    @IsNotEmpty()
    @IsString()
    sender: string;

    @ApiProperty({ example: 'JaneDoe', description: 'Nom d\'utilisateur' })
    @IsNotEmpty()
    @IsString()
    receiver: string;

    @ApiProperty({ example: '2021-09-01T00:00:00.000Z', description: 'Date de création du message' })
    @IsNotEmpty()
    @IsString()
    createdAt: Date;

}