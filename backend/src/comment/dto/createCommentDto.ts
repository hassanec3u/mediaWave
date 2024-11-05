import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {

    @ApiProperty({ example: 'JohnDoe', description: 'Auteur du commentaire' })
    @IsString()
    @IsNotEmpty()
    readonly author: string;

    @ApiProperty({ example: '12345', description: 'ID du post' })
    @IsString()
    @IsNotEmpty()
    readonly post: string;

    @ApiProperty({ example: 'Ceci est un commentaire.', description: 'Contenu du commentaire' })
    @IsString()
    @IsNotEmpty()
    readonly content: string;
}