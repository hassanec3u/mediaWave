import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Like} from "../schema/likeSchema";
import {from, map, Observable, of, switchMap, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {Post} from "../../posts/schema/postSchema";

@Injectable()
export class LikeDao {
    constructor(
        @InjectModel(Like.name)
        private readonly _likeModel: Model<Like>,
        @InjectModel(Post.name)
        private readonly _postModel: Model<Post>,
    ) {
    }


    async likePost(userId: string, postId: string): Promise<void> {
        try {

            const like = await this._likeModel.findOne({ user: userId, post: postId });
            if (like) {
                console.error(`L'utilisateur ${userId} a déjà liké le post ${postId}`);
                return;
            }

            await this._likeModel.create({ user: userId, post: postId });
            console.log(`Like ajouté pour le post ${postId}`);

       await this._postModel.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true }).exec();
        } catch (error) {
            console.error("Erreur lors de l'ajout du like :", error);
            throw error; // Propagation de l'erreur
        }
    }


    async unlikePost(userId: string, postId: string): Promise<void> {
        try {
            await this._likeModel.findOneAndDelete({ user: userId, post: postId });
            console.log(`Like retiré pour le post ${postId}`);

            await this._postModel.findByIdAndUpdate(postId, { $inc: { likes: -1 } }, { new: true }).exec();
        } catch (error) {
            console.error("Erreur lors de la suppression du like :", error);
            throw error; // Propagation de l'erreur
        }
    }


    getNumberOfLikes(postId: string): Observable<number> {
        return from(this._postModel.findById(postId).select('likes')).pipe(
            map(post => {
                if (!post) {
                    console.error("Aucun post trouvé pour l'id", postId);
                }
                return post?.likes || 0;
            }),
            catchError(error => {
                console.error("Erreur lors de la récupération des likes :", error);
                return of(0);
            })
        );
    }

    hasLikedPost(userId: string, postId: string): Observable<boolean> {
        return from(this._likeModel.findOne({user: userId, post: postId}))
            .pipe(
                map(like => like !== null),
                catchError(() => of(false))
            );
    }
}


