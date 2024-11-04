import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiProperty({ example: 'JohnDoe', description: 'Nom d\'utilisateur' })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ example: 'password123', description: 'Mot de passe' })
    @IsNotEmpty()
    @IsString()
    password: string;
}