import {Exclude, Expose, Type} from "class-transformer";

@Exclude()
export class FileEntity {
    @Expose()
    @Type(() => String)
    message: string;

    @Expose()
    @Type(() => String)
    filePath: string;


    constructor(message: string, filePath: string) {
        this.message = message;
        this.filePath = filePath;
    }
}