import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {User} from "../schema/userSchema";
import {CreateUserDto} from "../dto/createUserDto.";
import {from, map, mergeMap, Observable, throwError} from "rxjs";
import {UpdateUserInfoDto} from "../dto/UpdateUserInfoDto";


@Injectable()
export class UserDao {
    constructor(
        @InjectModel(User.name)
        private readonly _personModel: Model<User>,
    ) {
    }


    save(createUserDto: CreateUserDto): void {
        const newUser = new this._personModel(createUserDto);
        newUser.save().then((r: User) => {
            console.log('User saved successfully:', r);
            return r;
        }).catch(err => {
            console.error('Error saving user:', err);
            throw err;
        });
    }

    findByUsername(username: string): Promise<User | null> {
        return this._personModel.findOne({username}).exec();
    }

    findByUsername1(username: string): Observable<User | null> {
        return from(this._personModel.findOne({username}).lean())
    }


    findByIdAndUpdate(id: string, user: Partial<UpdateUserInfoDto>) : Observable<User> {
      
        return from(this._personModel.findByIdAndUpdate(id, user, {new: true, runValidators: true}).lean());
    }

    findUserById(id: string): Observable<User | null> {
        return from(this._personModel.findById(id).lean());
    }


    searchUsers(query: string): Observable<User[]> {
        return from(this._personModel.find({
            username: {
                $regex: query,
                $options: 'i'
            }
        }).lean().exec()).pipe(map(users => users || []));
    }


    sendFriendRequest(userId: string, friendId: string): Observable<User> {
        return this.findUserById(userId).pipe(
            mergeMap(user =>
                from(this._personModel.findById(friendId).lean()).pipe(
                    mergeMap(friend => {
                        const userIdStr = user._id.toString();
                        if (friend.friendRequests.some(req => req._id.toString() === userIdStr) ||
                            friend.friends.some(fr => fr._id.toString() === userIdStr)) {
                            console.log('Friend request already sent');
                            return throwError(() => new Error('Friend request already sent'));
                        }
                        return from(this._personModel.findByIdAndUpdate(friendId, {$push: {friendRequests: user._id}}, {new: true}).lean());
                    })
                )
            )
        );
    }

    removeFriend(userId: string, friendId: string): Observable<User[]> {
        return from(
            Promise.all([
                this._personModel.findByIdAndUpdate(userId, {$pull: {friends: friendId}}, {new: true}).lean(),
                this._personModel.findByIdAndUpdate(friendId, {$pull: {friends: userId}}, {new: true}).lean()
            ])
        );
    }

    getFriends(userId: string): Observable<User[]> {
        return from(this._personModel.findById(userId).populate('friends').lean()).pipe(
            map(user => user?.friends || []));
    }

    getPendingFriends(userId: string): Observable<User[]> {
        return from(this._personModel.findById(userId).populate('friendRequests').lean()).pipe(
            map(user => user?.friendRequests || [])
        );
    }

    refuseFriend(userId: string, friendId: string): Observable<User[]> {
        return this.findUserById(userId).pipe(
            mergeMap(user =>
                from(this._personModel.findByIdAndUpdate(user, {$pull: {friendRequests:friendId}}, {new: true}).lean()).pipe(
                    map(updatedUser => [updatedUser])
                )
            )
        );
    }

    acceptFriend(userId: string, friendId: string) {
        return this.findUserById(userId).pipe(
            mergeMap(user =>
                from(this._personModel.findById(friendId).lean()).pipe(
                    mergeMap(friend => {
                        const userIdStr = user._id.toString();

                        // Vérifiez si les utilisateurs sont déjà amis
                        if (friend.friends.some(fr => fr._id.toString() === userIdStr)) {
                            console.log('Friend request already accepted');
                            return throwError(() => new Error('Friend request already accepted'));
                        }

                        // rajoute l'ami à la liste d'amis dans les deux sens
                        return from(
                            Promise.all([
                                this._personModel.findByIdAndUpdate(friendId,
                                    {
                                        $push: {friends: user._id},
                                        $pull: {friendRequests: user._id}
                                    }, {new: true}).lean(),

                                this._personModel.findByIdAndUpdate(userId, {
                                    $push: {friends: friend._id},
                                    $pull: {friendRequests: friend._id}
                                }, {new: true}).lean()
                            ])
                        );
                    })
                )
            )
        );
    }
}