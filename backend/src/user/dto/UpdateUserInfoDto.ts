import { IsEmail, IsNotEmpty, IsOptional, IsString, IsDate } from "class-validator";

export class UpdateUserInfoDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    bio: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    profilePicture: string;

    @IsOptional()
    @IsDate()
    birthday?: Date;

    @IsOptional()
    @IsString()
    pays?: string;
}
