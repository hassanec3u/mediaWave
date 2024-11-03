import {catchError, map, mergeMap, Observable, of, throwError} from "rxjs";
import {ConflictException, Injectable, NotFoundException, UnprocessableEntityException} from "@nestjs/common";

import {UserEntity} from "./entity/UserEntity";
import {UserDao} from "./dao/UserDao";
import {UpdateUserInfoDto} from "./dto/UpdateUserInfoDto";
import {User} from "./schema/userSchema";
import {UserWithPostEntity} from "./entity/UserWithPostEntity";

@Injectable()
export class UserService {
    constructor(private userDao: UserDao) {
    }

    findUserByUsername(username: string): Observable<UserEntity> {
        return this.userDao.findByUsername1(username).pipe(
            catchError((e) => throwError(() => new UnprocessableEntityException(e.message))),
            mergeMap((user) => !!user ? of(new UserEntity(user))
                : throwError(() => new NotFoundException(`User with username '${username}' not found`),)));
    }

    updateUserInfo(id: string, updateUserInfoDto: UpdateUserInfoDto): Observable<UserEntity> {
        updateUserInfoDto.username = updateUserInfoDto.username.toLowerCase();

        return this.userDao.findByUsername1(updateUserInfoDto.username).pipe(
            mergeMap(existingUser => {
                if(existingUser) {
                    return throwError(() =>
                        new ConflictException(`Username ${updateUserInfoDto.username} already exists`));
                }
                return this.userDao.findByIdAndUpdate(id, updateUserInfoDto).pipe(
                    mergeMap(
                        (userUpdated) => !!userUpdated ? of(new UserEntity(userUpdated))
                            : throwError(() => new NotFoundException(`User with ID '${id}' not found`))));
            })
        )
    }

    findUserById(id: string): Observable<UserEntity> {
        return this.userDao.findUserById(id).pipe(
            mergeMap(
                (user) => !!user ? of(new UserEntity(user))
                    : throwError(() => new NotFoundException(`User with ID '${id}' not found`))));
    }

    searchUsers(query: string): Observable<UserEntity[]> {
        return this.userDao.searchUsers(query).pipe(
            mergeMap((users) => users.length > 0
                ? of(users.map(user => new UserEntity(user)))
                : throwError(() => new NotFoundException(`No users found for query '${query}'`))
            ),
            catchError((e) => throwError(() => new UnprocessableEntityException(e.message)))
        );
    }

    sendFriendRequest(userId: string, friendId: string): void {
        this.userDao.sendFriendRequest(userId, friendId).pipe(
            catchError((e) => throwError(() => new UnprocessableEntityException(e.message))))
            .subscribe({
                next: () => console.log('Friend request sent'),
                error: (err) => console.error('Error adding friend:', err)
            });
    }

    removeFriend(userId: string, friendId: string): void {
        this.userDao.removeFriend(userId, friendId).pipe(
            catchError((e) => throwError(() => new UnprocessableEntityException(e.message))))
            .subscribe({
                next: () => console.log('Friend request sent'),
                error: (err) => console.error('Error adding friend:', err)
            });
    }

    getFriends(userId: string): Observable<UserEntity[]> {
        return this.userDao.getFriends(userId).pipe(
            map((friends) => friends.map(friend => new UserEntity(friend))),
            catchError((e) => throwError(() => new UnprocessableEntityException(e.message)))
        );
    }

    getFriendRequest(userId: string): Observable<UserEntity[]> {
        return this.userDao.getPendingFriends(userId).pipe(
            mergeMap((friends) => of(friends.map(friend => new UserEntity(friend)))),
            catchError((e) => throwError(() => new UnprocessableEntityException(e.message)))
        );
    }

    acceptFriend(userId: string, friendId: string) {
        this.userDao.acceptFriend(userId, friendId).pipe(
            catchError((e) => throwError(() => new UnprocessableEntityException(e.message)))
        ).subscribe({
            next: () => console.log('Friend request accepted'),
            error: (err) => console.error('Error accepting friend:', err)
        });
    }

    refuseFriend(userId: string, friendId: string) {
        this.userDao.refuseFriend(userId, friendId).pipe(
            catchError((e) => throwError(() => new UnprocessableEntityException(e.message)))
        ).subscribe({
            next: () => console.log('Friend request declined'),
            error: (err) => console.error('Error declining friend:', err)
        });
    }
      
    updateProfilePicture(id: string, profilePicture: string) {
        const updateData : Partial<UpdateUserInfoDto> = {profilePicture};
        return this.userDao.findByIdAndUpdate(id, updateData).pipe(
            mergeMap(
                (userUpdated) => !!userUpdated ? of(new UserEntity(userUpdated))
                    : throwError(() => new NotFoundException(`User with ID '${id}' not found`))));
    }

    findUserByIdWithPosts(id: string): Observable<UserWithPostEntity> {
        return this.userDao.findUserById(id).pipe(
            mergeMap(
                (user) => !!user ? of(new UserWithPostEntity(user))
                    : throwError(() => new NotFoundException(`User with ID '${id}' not found`))));
    }
}