import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserEntity } from "./entity/UserEntity";
import { UserService } from "./user.service";
import { UpdateUserInfoDto } from "./dto/UpdateUserInfoDto";
import { AuthGuard } from "../auth/AuthGuard";
import { PostEntity } from "../posts/entity/PostEntity";
import { PostsService } from "../posts/posts.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@ApiBearerAuth()  // Utilisé pour l'authentification avec un token Bearer
@ApiTags('User')  // Regroupe les routes sous la catégorie "User" dans Swagger
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
                private readonly postService: PostsService) {}

    @Get('search')
    @ApiOperation({ summary: 'Recherche d\'utilisateurs par nom' })
    @ApiResponse({ status: 200, description: 'Liste des utilisateurs correspondant au critère de recherche', type: [UserEntity] })
    searchUsers(@Query('query') query: string): Observable<UserEntity[]> {
        return this.userService.searchUsers(query);
    }

    @Get("username/:username")
    @ApiOperation({ summary: 'Trouver un utilisateur par nom d\'utilisateur' })
    @ApiResponse({ status: 200, description: 'Utilisateur trouvé', type: UserEntity })
    findUserByUsername(@Param('username') username: string): Observable<UserEntity> {
        return this.userService.findUserByUsername(username);
    }

    @Put("/picture/:id")
    @ApiOperation({ summary: 'Mise à jour de la photo de profil de l\'utilisateur' })
    @ApiResponse({ status: 200, description: 'Photo de profil mise à jour' })
    updateProfilePicture(@Param('id') id: string, @Body() body: { profilePicture: string }) {
        return this.userService.updateProfilePicture(id, body.profilePicture);
    }

    @Put(":id")
    @ApiOperation({ summary: 'Mise à jour des informations de l\'utilisateur' })
    @ApiResponse({ status: 200, description: 'Informations de l\'utilisateur mises à jour', type: UserEntity })
    updateUserInfo(@Param('id') id: string, @Body() updateUserInfoDto: UpdateUserInfoDto): Observable<UserEntity> {
        return this.userService.updateUserInfo(id, updateUserInfoDto);
    }

    @Get(":id")
    @ApiOperation({ summary: 'Trouver un utilisateur par ID' })
    @ApiResponse({ status: 200, description: 'Utilisateur trouvé', type: UserEntity })
    findUserById(@Param('id') id: string): Observable<UserEntity> {
        return this.userService.findUserById(id);
    }

    @Post(':userId/friends/:friendId')
    @ApiOperation({ summary: 'Envoyer une demande d\'ami' })
    @ApiResponse({ status: 201, description: 'Demande d\'ami envoyée' })
    sendFriendRequest(@Param('userId') userId: string, @Param('friendId') friendId: string): void {
        this.userService.sendFriendRequest(userId, friendId);
    }

    @Post(':userId/friends/:friendId/accept')
    @ApiOperation({ summary: 'Accepter une demande d\'ami' })
    @ApiResponse({ status: 201, description: 'Demande d\'ami acceptée' })
    acceptFriend(@Param('userId') userId: string, @Param('friendId') friendId: string): void {
        this.userService.acceptFriend(userId, friendId);
    }

    @Delete(':userId/friends/:friendId/refuse')
    @ApiOperation({ summary: 'Refuser une demande d\'ami' })
    @ApiResponse({ status: 200, description: 'Demande d\'ami refusée' })
    refuseFriend(@Param('userId') userId: string, @Param('friendId') friendId: string): void {
        this.userService.refuseFriend(userId, friendId);
    }

    @Delete(':userId/friends/:friendId')
    @ApiOperation({ summary: 'Retirer un ami' })
    @ApiResponse({ status: 200, description: 'Ami retiré' })
    removeFriend(@Param('userId') userId: string, @Param('friendId') friendId: string): void {
        this.userService.removeFriend(userId, friendId);
    }

    @Get(':userId/friends')
    @ApiOperation({ summary: 'Obtenir la liste des amis d\'un utilisateur' })
    @ApiResponse({ status: 200, description: 'Liste des amis', type: [UserEntity] })
    getFriends(@Param('userId') userId: string): Observable<UserEntity[]> {
        return this.userService.getFriends(userId);
    }

    @Get(':userId/friends/pending')
    @ApiOperation({ summary: 'Obtenir les demandes d\'ami en attente' })
    @ApiResponse({ status: 200, description: 'Demandes d\'ami en attente', type: [UserEntity] })
    getFriendRequest(@Param('userId') userId: string): Observable<UserEntity[]> {
        return this.userService.getFriendRequest(userId);
    }

    @Get(':userId/posts')
    @ApiOperation({ summary: 'Obtenir les publications de l\'utilisateur' })
    @ApiResponse({ status: 200, description: 'Liste des publications de l\'utilisateur', type: [PostEntity] })
    getUserPosts(@Param('userId') userId: string): Observable<PostEntity> {
        return this.postService.getPostsByUser(userId);
    }

    @Get(':userId/friends/posts')
    @ApiOperation({ summary: 'Obtenir les publications des amis de l\'utilisateur' })
    @ApiResponse({ status: 200, description: 'Liste des publications des amis', type: [PostEntity] })
    getFriendsPosts(@Param('userId') userId: string): Observable<PostEntity[]> {
        return this.postService.getFriendsPosts(userId);
    }
}
