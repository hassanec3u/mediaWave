import {Exclude, Expose, Type} from "class-transformer";
import {User} from "../../user/schema/userSchema";


@Exclude()
export class PostEntity {
    @Expose()
    @Type(() => String)
    _id: string;

    @Expose()
    @Type(() => String)
    title: string;

    @Expose()
    @Type(() => String)
    content: string;

    @Expose()
    @Type(() => String)
    postPicture: string;

    @Expose()
    publisher: User;

    constructor(partial: Partial<PostEntity>) {
        Object.assign(this, partial);
    }
}