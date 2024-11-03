import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import {UserModule} from "./user/user.module";
import { FilesUploadModule } from './files-upload/files-upload.module';
import { PostsModule } from './posts/posts.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/nestjs-social-app'),
        AuthModule,
        UserModule,
        PostsModule,
        UserModule,
        FilesUploadModule
    ]
})
export class AppModule {
}
