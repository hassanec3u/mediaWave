import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'JohnDoe', description: 'Nom d\'utilisateur' })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ example: 'johndoe@example.com', description: 'Adresse email' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', description: 'Mot de passe' })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ example: 'password123', description: 'Confirmation du mot de passe' })
    @IsNotEmpty()
    @IsString()
    passwordConfirm: string;
}