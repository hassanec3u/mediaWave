import {Injectable, NotFoundException, UnprocessableEntityException} from "@nestjs/common";
import {catchError, mergeMap, Observable, of, throwError} from "rxjs";
import {UserEntity} from "./entity/UserEntity";
import {UserDao} from "./dao/UserDao";
import {UpdateUserInfoDto} from "./dto/UpdateUserInfoDto";

@Injectable()
export class UserService {
    constructor(private userDao: UserDao) {
    }

    findUserByUsername(username: string) : Observable<UserEntity> {
        return this.userDao.findByUsername1(username).pipe(
            catchError((e) => throwError(() => new UnprocessableEntityException(e.message))),
            mergeMap((user) => !!user ? of(new UserEntity(user))
                : throwError(() => new NotFoundException(`User with username '${username}' not found`),)));
    }

    updateUserInfo(id: string, updateUserInfoDto: UpdateUserInfoDto): Observable<UserEntity> {
        return this.userDao.findByIdAndUpdate(id, updateUserInfoDto).pipe(
            mergeMap(
                (userUpdated) => !!userUpdated ? of(new UserEntity(userUpdated))
                    : throwError(() => new NotFoundException(`User with ID '${id}' not found`))));
    }

    findUserById(id: string): Observable<UserEntity> {
        return this.userDao.findUserById(id).pipe(
            mergeMap(
                (user) => !!user ? of(new UserEntity(user))
                    : throwError(() => new NotFoundException(`User with ID '${id}' not found`))));
    }

    updateProfilePicture(id: string, profilePicture: string) {
        const updateData : Partial<UpdateUserInfoDto> = {profilePicture};
        return this.userDao.findByIdAndUpdate(id, updateData).pipe(
            mergeMap(
                (userUpdated) => !!userUpdated ? of(new UserEntity(userUpdated))
                    : throwError(() => new NotFoundException(`User with ID '${id}' not found`))));
    }
}