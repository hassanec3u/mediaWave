import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {PostDao} from "./dao/PostDao";
import {MongooseModule} from "@nestjs/mongoose";
import {Post, PostSchema} from "./schema/postSchema";

@Module({
  controllers: [PostsController],
  imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
  providers: [PostsService, PostDao],
})
export class PostsModule {}
