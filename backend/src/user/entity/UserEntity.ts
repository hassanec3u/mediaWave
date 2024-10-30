import {Exclude, Expose, Type} from "class-transformer";

@Exclude()
export class UserEntity {
    @Expose()
    @Type(() => String)
    _id: string;
    @Expose()
    @Type(() => String)
    username: string;
    @Expose()
    @Type(() => String)
    email: string;
    @Expose()
    @Type(() => String)
    profilePicture: string;
    @Expose()
    @Type(() => String)
    bio: string;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}