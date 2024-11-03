import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schema/userSchema";
import {AuthService} from "../auth/auth.service";
import {UserDao} from "./dao/UserDao";
import {AuthController} from "../auth/auth.controller";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {PostsModule} from "../posts/posts.module";

@Module({
    imports: [
        JwtModule.register({
            secret: 'secretKey',
            signOptions: { expiresIn: '1h' },
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        PostsModule
    ],
    providers: [UserService, UserDao],
    controllers: [UserController],
})
export class UserModule {

}