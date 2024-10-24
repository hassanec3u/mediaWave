import {Body, Controller, Post} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto.';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('')
    async createUser(@Body() createUserDto: CreateUserDto) {
        await this.userService.createUser(createUserDto);
    }
}