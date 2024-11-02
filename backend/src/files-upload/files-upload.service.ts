import {BadRequestException, Injectable} from '@nestjs/common';
import {FileEntity} from "./entity/FileEntity";

@Injectable()
export class FilesUploadService {

    handleFileUpload(file: Express.Multer.File): FileEntity {
        if(!file) {
            throw new BadRequestException("No file Uploaded");
        }
        return new FileEntity('File uploaded successfuly', file.path);
    }
}
