import {forwardRef, Module} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {PostDao} from "./dao/PostDao";
import {MongooseModule} from "@nestjs/mongoose";
import {Post, PostSchema} from "./schema/postSchema";
import {UserModule} from "../user/user.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [PostsController],
  imports: [
    AuthModule,
      MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    forwardRef(() => UserModule)],
  providers: [PostsService, PostDao],
  exports: [PostsService]
})
export class PostsModule {}
