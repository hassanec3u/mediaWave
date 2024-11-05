import {Exclude, Expose, Type} from "class-transformer";
import {UserEntity} from "../../user/entity/UserEntity";



@Exclude()
export class CommentEntity {
    @Expose()
    @Type(() => String)
    _id: string;


    @Expose()
    @Type(() => String)
    content: string;

    @Expose()
    @Type(() => Date)
    createdAt: Date;

    @Expose()
    @Type(() => UserEntity)
    author: UserEntity;

    constructor(partial: Partial<CommentEntity>) {
        Object.assign(this, partial);
    }
}