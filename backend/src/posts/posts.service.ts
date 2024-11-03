import {Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {PostDao} from "./dao/PostDao";
import {CreatePostDto} from "./dto/createPostDto";
import {catchError, map, mergeMap, Observable, of, throwError} from "rxjs";
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

    deletePost(id: string): Observable<void> {
        return this.postDao.deletePost(id);
    }

    getPostsByUser(userId: string): Observable<PostEntity> {
        return this.postDao.getPostsByUser(userId).pipe(
            mergeMap((posts) => of(posts.map(post => new PostEntity(post)))),
            catchError((e) => throwError(() => new UnprocessableEntityException(e.message))));
    }

    findPostById(id: string): Observable<PostEntity> {
        return this.postDao.findPostById(id).pipe(
            mergeMap((post) => of(new PostEntity(post))),
            catchError((e) => throwError(() => new NotFoundException(`Post with ID ${id} not found`)))
        );
    }
}
