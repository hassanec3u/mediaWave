import { Exclude, Expose, Type } from "class-transformer";

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

    @Expose()
    @Type(() => Date)
    birthday?: Date;

    @Expose()
    @Type(() => String)
    pays?: string;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
