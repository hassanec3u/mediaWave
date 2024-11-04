import { IsEmail, IsNotEmpty, IsOptional, IsString, IsDate } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserInfoDto {
    @ApiProperty({ example: 'JohnDoe', description: 'Nom d\'utilisateur', required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ example: 'johndoe@example.com', description: 'Adresse email', required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'A short bio', description: 'Biographie', required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    bio: string;

    @ApiProperty({ example: 'http://example.com/profile.jpg', description: 'Photo de profil', required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    profilePicture: string;

    @ApiProperty({ example: '1990-01-01', description: 'Date de naissance', required: false })
    @IsOptional()
    @IsString()
    birthday?: string;

    @ApiProperty({ example: 'France', description: 'Pays', required: false })
    @IsOptional()
    @IsString()
    pays?: string;
}