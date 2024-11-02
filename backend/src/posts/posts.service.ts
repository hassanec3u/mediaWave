import { Injectable } from '@nestjs/common';
import {PostDao} from "./dao/PostDao";
import {CreatePostDto} from "./dto/createPostDto";
import {map, mergeMap, Observable, of} from "rxjs";
import {Post} from "./schema/postSchema";
import {PostEntity} from "./entity/PostEntity";

@Injectable()
export class PostsService {

    constructor(private postDao: PostDao) {
    }

    savePost(createPostDto: CreatePostDto): Observable<PostEntity> {
        return this.postDao.save(createPostDto).pipe(
            mergeMap(savedPost => of(new PostEntity(savedPost))));
    }

    updatePost(postId: string, createPostDto: CreatePostDto): Observable<PostEntity> {
        return this.postDao.findByIdAndUpdate(postId, createPostDto).pipe(
            mergeMap(updatedPost => of(new PostEntity(updatedPost))));
    }

    deletePost(id: string): void {
        this.postDao.deletePost(id);
    }
}
