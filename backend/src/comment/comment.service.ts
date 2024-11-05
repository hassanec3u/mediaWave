import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {CreateCommentDto} from './dto/createCommentDto';
import {catchError, map, Observable, throwError} from "rxjs";
import {CommentEntity} from "./entity/CommentEntity";
import {CommentDao} from "./dao/commentDao";

@Injectable()
export class CommentsService {


    constructor(private CommentDao: CommentDao) {
    }

    //Create comment from dao with observable
    create(createCommentDto: CreateCommentDto): Observable<CommentEntity> {
        return this.CommentDao.save(createCommentDto);
    }

    //Find all comments from dao with observable for a post
    getAllCommentsForAPost( postId: string): Observable<CommentEntity[]> {
        return this.CommentDao.getCommentsByPost(postId).pipe(
            map((comments) => {
                console.log('comments:', comments);
                return comments;
            }),
            map((comments) => comments.map(comment => new CommentEntity(comment))),
            catchError((e) => throwError(() => new UnprocessableEntityException(e.message)))
        );
    }

    //Delete comment from dao that retrun void
    deleteComment(commentId: string): void {
        this.CommentDao.deleteComment(commentId).pipe(
            catchError((e) => throwError(() => new UnprocessableEntityException(e.message)))
        ).subscribe(
            {
                next: () => console.log('comment deleted'),
                error: (err) => console.error('error deleting comment', err)
            }
        );
    }
}