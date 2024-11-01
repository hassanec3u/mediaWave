import { Module } from '@nestjs/common';
import { FilesUploadService } from './files-upload.service';
import { FilesUploadController } from './files-upload.controller';
import {MulterModule} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import e from "express";
import {Error} from "mongoose";

@Module({
  imports: [
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
export class FilesUploadModule {}
