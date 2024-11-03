import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../environments/environments";
import {Observable, switchMap} from "rxjs";
import {Post} from "../shared/types/post.type";
import {PicturesService} from "./picturesService";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private userId: string;
    private backendUrl = `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;

    constructor(private http: HttpClient,
                private cookieService: CookieService,
                private picturesService: PicturesService) {
        this.userId = this.cookieService.get('userId');
    }

    addPost(newPost: Post, picturePost: File | null): Observable<Post> {
        console.log("Service method add new post")
        newPost.publisher = this.userId;
        if (picturePost != null) {
            console.log("post with photo")
            return this.picturesService.uploadPicture(picturePost).pipe(
                switchMap((response) => {
                    newPost.postPicture = response.filePath;
                    return this.http.post<Post>(this.backendUrl + environment.backend.endpoints.addPost, newPost);
                }));
        } else {
            console.log("post without photo")
            return this.http.post<Post>(this.backendUrl + environment.backend.endpoints.addPost, newPost);
        }
    }

    updatePost(updatedPost: Post): Observable<Post> {
        updatedPost.publisher = this.userId;
        return this.http.put<Post>(this.backendUrl + environment.backend.endpoints.updatePost, updatedPost);
    }

    deletePost(postId: string): void {
        this.http.delete(this.backendUrl + environment.backend.endpoints.deletePost + postId);
    }

    getUserPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.backendUrl}/user/${this.userId}/posts`);
    }
}