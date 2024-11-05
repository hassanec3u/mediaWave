import {Injectable} from '@nestjs/common';

import {Like, LikeDocument} from './schema/likeSchema';
import {UserService} from "../user/user.service";
import {LikeDao} from "./dao/likeDao";
import {Observable} from "rxjs";


@Injectable()
export class LikeService {

    constructor(private likeDao: LikeDao,) {
    }

    likePost(userId: string, postId: string): void {
        this.likeDao.likePost(userId, postId)
    }

    unlikePost(userId: string, postId: string): void {
         this.likeDao.unlikePost(userId, postId);
    }

    getNumberOfLikes(postId: string): Observable<number> {
        return this.likeDao.getNumberOfLikes(postId);
    }

    hasLikedPost(userId: string, postId: string) : Observable<boolean> {
        return this.likeDao.hasLikedPost(userId, postId);}
}