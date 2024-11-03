import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Comment} from "../schema/commentSchema";
import {CreateCommentDto} from "../dto/createCommentDto";
import {from, Observable} from "rxjs";


@Injectable()
export class CommentDao {
    constructor(
        @InjectModel(Comment.name)
        private readonly _commentModel: Model<Comment>,
    ) {}


    save(createCommentDto: CreateCommentDto): Observable<Comment> {
        const newComment = new this._commentModel(createCommentDto);
        return from(newComment.save().then((savedComment) => {
                return savedComment.toObject();
            }).catch(err => {
                console.error('Error saving comment:', err);
                throw err;
            })
        );
    }

    deleteComment(Commentid: string): Observable<Comment> {
        return from(this._commentModel.findByIdAndDelete(Commentid));
    }

    getCommentsByPost(postId: string): Observable<Comment[]> {
        return from(
            this._commentModel
                .find({ post: postId }).populate('author', '_id username email').sort({ commentDate: -1 }).lean().exec()
        );    }
}
