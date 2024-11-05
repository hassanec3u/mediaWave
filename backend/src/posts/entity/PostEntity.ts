import {Exclude, Expose, Type} from "class-transformer";
import {User} from "../../user/schema/userSchema";
import {UserEntity} from "../../user/entity/UserEntity";


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
    @Type(() => Date)
    postDate: Date;

    @Expose()
    publisher: UserEntity;

    constructor(partial: Partial<PostEntity>) {
        Object.assign(this, partial);
    }
}