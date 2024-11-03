import {User} from "./user.type";

export type Post = {
    _id?: string;
    title?: string;
    content?: string;
    postDate?: Date;
    publisher: any;
    postPicture?: string;
}