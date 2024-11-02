import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class UpdateUserInfoDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    bio: string;

    profilePicture: string;
}