import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty({
        description: 'Title of the post',
        example: 'My First Post',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Content of the post',
        example: 'This is the content of my first post.',
    })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({
        description: 'URL of the post picture',
        example: 'http://example.com/post-picture.jpg',
        required: false,
    })
    postPicture: string;
}