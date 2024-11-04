import {IsNotEmpty, IsString} from "class-validator";

export class CreateCommentDto {

    @IsString()
    @IsNotEmpty()
    readonly author: string;

    @IsString()
    @IsNotEmpty()
    readonly post: string;

    @IsString()
    @IsNotEmpty()
    readonly content: string;
}