import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConversationDto {
    @IsNotEmpty()
    @IsString()
    userId1: string;

    @IsNotEmpty()
    @IsString()
    userId2: string;

    @IsNotEmpty()
    @IsString()
    lastMessage: string;
}
