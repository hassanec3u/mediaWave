import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Post} from "../schema/postSchema";
import {CreateUserDto} from "../../user/dto/createUserDto.";
import {User} from "../../user/schema/userSchema";
import {CreatePostDto} from "../dto/createPostDto";
import {from, Observable} from "rxjs";
import {PostEntity} from "../entity/PostEntity";


@Injectable()
export class PostDao {
    constructor(
        @InjectModel(Post.name)
        private readonly _postModel: Model<Post>,
    ) {}

    save(createPostDto: CreatePostDto): Observable<Post> {
        const newPost = new this._postModel(createPostDto);
        return from(newPost.save().then((savedPost) => {
                return savedPost.toObject();
            }).catch(err => {
                console.error('Error saving post:', err);
                throw err;
            })
        );
    }

    findByIdAndUpdate(id: string, createPostDto: CreatePostDto): Observable<Post> {
        return from(this._postModel.findByIdAndUpdate(id, createPostDto, {new: true, runValidators: true}).lean());
    }

    deletePost(id: string): void {
        this._postModel.findByIdAndDelete(id);
    }

    getPostsByUser(userId: string): Observable<any> {
        return from(this._postModel.find({ publisher: userId }).populate('publisher').sort({ postDate: -1 }).lean());
    }

    findPostById(id: string): Observable<Post> {
        return from(this._postModel.findById(id).lean());
    }
}