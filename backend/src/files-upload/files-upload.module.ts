import {Module} from '@nestjs/common';
import {FilesUploadService} from './files-upload.service';
import {FilesUploadController} from './files-upload.controller';
import {MulterModule} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        AuthModule,
        MulterModule.register({
            storage: diskStorage({
                destination: "./uploads",
                filename: (req, file, cb) => {
                    const filename = `${Date.now()}-${file.originalname}`;
                    cb(null, filename);
                }
            })
        })
    ],
    controllers: [FilesUploadController],
    providers: [FilesUploadService],
})
export class FilesUploadModule {
}
