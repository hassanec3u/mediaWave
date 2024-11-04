import {forwardRef, Module, Post} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { Like, LikeSchema } from './schema/likeSchema';
import {AuthModule} from "../auth/auth.module";
import {LikeDao} from "./dao/likeDao";
import {PostsModule} from "../posts/posts.module";

@Module({
    imports: [
        AuthModule,
        forwardRef(() => PostsModule),
        MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    ],
    providers: [LikeService, LikeDao],
    controllers: [LikeController],
    exports: [LikeDao]
})
export class LikeModule {}