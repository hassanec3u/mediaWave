import {Controller, Get, Post, Query, StreamableFile, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import { createReadStream } from 'fs';
import { join } from 'path';

import {FileEntity} from "./entity/FileEntity";
import { FilesUploadService } from './files-upload.service';
import * as process from "process";

@Controller('upload')
export class FilesUploadController {
  constructor(private readonly filesUploadService: FilesUploadService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File): FileEntity {
    return this.filesUploadService.handleFileUpload(file);
  }

  @Get('')
  getFile(@Query('filePath') filePath: string): StreamableFile {
    console.log("GET: "+filePath)
    const file = createReadStream(join(process.cwd(), filePath));
    return new StreamableFile(file);
  }
}
