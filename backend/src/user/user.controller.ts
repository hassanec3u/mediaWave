import {
    Body,
    ClassSerializerInterceptor,
    Controller, Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseInterceptors
} from "@nestjs/common";
import {mergeMap, Observable} from "rxjs";
import {UserEntity} from "./entity/UserEntity";
import {UserService} from "./user.service";
import {UpdateUserInfoDto} from "./dto/UpdateUserInfoDto";

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @Get('search')
    searchUsers(@Query('query') query: string): Observable<UserEntity[]> {
        return this.userService.searchUsers(query);
    }

    @Get("username/:username")
    findUserByUsername(@Param('username') username: string): Observable<UserEntity> {
        console.log(username);
        return this.userService.findUserByUsername(username);
    }

    @Put(":id")
    updateUserInfo(@Param('id') id: string, @Body() updateUserInfoDto: UpdateUserInfoDto): Observable<UserEntity> {
        return this.userService.updateUserInfo(id, updateUserInfoDto);
    }

    @Get(":id")
    findUserById(@Param('id') id: string): Observable<UserEntity> {
        return this.userService.findUserById(id);
    }



    @Post(':userId/friends/:friendId')
    sendFriendRequest(@Param('userId') userId: string, @Param('friendId') friendId: string):  void{
          this.userService.sendFriendRequest(userId, friendId);
    }

    //route pour accepter une demande d'ami
    @Post(':userId/friends/:friendId/accept')
    acceptFriend(@Param('userId') userId: string, @Param('friendId') friendId: string): void {
        this.userService.acceptFriend(userId, friendId);
    }

    //route pour refuser une demande d'ami
    @Delete(':userId/friends/:friendId/refuse')
    refuseFriend(@Param('userId') userId: string, @Param('friendId') friendId: string): void {
        this.userService.refuseFriend(userId, friendId);
    }

    @Delete(':userId/friends/:friendId')
    removeFriend(@Param('userId') userId: string, @Param('friendId') friendId: string): void{
         this.userService.removeFriend(userId, friendId);
    }

    @Get(':userId/friends')
    getFriends(@Param('userId') userId: string): Observable<UserEntity[]> {
        return this.userService.getFriends(userId);
    }

    @Get(':userId/friends/pending')
    getFriendRequest(@Param('userId') userId: string): Observable<UserEntity[]> {
        return this.userService.getFriendRequest(userId);
    }
}