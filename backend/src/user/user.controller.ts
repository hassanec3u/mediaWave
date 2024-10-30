import {Body, ClassSerializerInterceptor, Controller, Get, Param, Put, UseInterceptors} from "@nestjs/common";
import {mergeMap, Observable} from "rxjs";
import {UserEntity} from "./entity/UserEntity";
import {UserService} from "./user.service";
import {UpdateUserInfoDto} from "./dto/UpdateUserInfoDto";

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @Get(":username")
    findUserByUsername(@Param('username') username: string): Observable<UserEntity> {
        console.log(username);
        return this.userService.findUserByUsername(username);
    }

    @Put(":id")
    updateUserInfo(@Param('id') id: string, @Body() updateUserInfoDto: UpdateUserInfoDto): Observable<UserEntity> {
        console.log(id);
        return this.userService.updateUserInfo(id, updateUserInfoDto);
    }
}