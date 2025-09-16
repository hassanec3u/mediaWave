import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environments";
import {Observable, switchMap} from "rxjs";
import {Post} from "../shared/types/post.type";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly backendUrl = `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;

  constructor(private readonly http: HttpClient) {
  }

  addPost(newPost: Post, picturePost: File | null): Observable<Post> {
    //log the newPost object
    console.log("New Post: ", newPost);
      return this.http.post<Post>(this.backendUrl + environment.backend.endpoints.posts.add, newPost);
    
  }

  updatePost( updatedPost: Post, picturePost: File | null): Observable<Post> {
      return this.http.put<Post>(this.backendUrl + environment.backend.endpoints.posts.update, updatedPost);
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete(this.backendUrl + environment.backend.endpoints.posts.delete(postId));
  }

  getUserPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.backendUrl + environment.backend.endpoints.posts.myPosts);
  }

  getFriendsPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.backendUrl}${environment.backend.endpoints.posts.friendPost}`);
  }
}
