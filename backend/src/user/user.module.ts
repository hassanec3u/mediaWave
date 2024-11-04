import {forwardRef, Module} from "@nestjs/common";
import {UserDao} from "./dao/UserDao";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {AuthModule} from "../auth/auth.module";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schema/userSchema";
import {PostsModule} from "../posts/posts.module";

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        forwardRef(() => PostsModule)
    ],
    providers: [UserService, UserDao],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {
}