import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environments";
import {Observable, switchMap} from "rxjs";
import {Post} from "../shared/types/post.type";
import {PicturesService} from "./picturesService";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly backendUrl = `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;

  constructor(private readonly http: HttpClient,
              private readonly picturesService: PicturesService) {
  }

  addPost(newPost: Post, picturePost: File | null): Observable<Post> {
    //log the newPost object
    console.log("New Post: ", newPost);
    if (picturePost != null) {
      console.log("post with photo")
      return this.picturesService.uploadPicture(picturePost).pipe(
        switchMap((response) => {
          newPost.postPicture = response.filePath;
          return this.http.post<Post>(this.backendUrl + environment.backend.endpoints.posts.add, newPost);
        }));
    } else {
      console.log("post without photo")
      return this.http.post<Post>(this.backendUrl + environment.backend.endpoints.posts.add, newPost);
    }
  }

  updatePost(postId: string, updatedPost: Post, picturePost: File | null): Observable<Post> {
    // updatedPost.publisher = this.userId;
    if (picturePost != null) {
      return this.picturesService.uploadPicture(picturePost).pipe(
        switchMap((response) => {
          updatedPost.postPicture = response.filePath;
          return this.http.put<Post>(this.backendUrl + environment.backend.endpoints.posts.update(postId), updatedPost);
        })
      )
    } else {
      return this.http.put<Post>(this.backendUrl + environment.backend.endpoints.posts.update(postId), updatedPost);
    }
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete(this.backendUrl + environment.backend.endpoints.posts.delete(postId));
  }

  getUserPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.backendUrl + environment.backend.endpoints.posts.myPosts);
  }

  getFriendsPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.backendUrl}${environment.backend.endpoints.posts.friends}`);
  }
}
