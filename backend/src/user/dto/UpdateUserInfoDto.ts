import {IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";

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

    profilePicture: string;
}