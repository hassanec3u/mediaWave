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
  const formData = new FormData();

  formData.append(
    'post',
    new Blob([JSON.stringify(newPost)], { type: 'application/json' })
  );

  // Ajouter le fichier s’il existe
  if (picturePost) {
    formData.append('file', picturePost);
  }

  return this.http.post<Post>(
    this.backendUrl + environment.backend.endpoints.posts.add,
    formData
  );
}

updatePost(post: Post, picturePost: File | null): Observable<Post> {
  const formData = new FormData();

  formData.append(
    'post',
    new Blob([JSON.stringify(post)], { type: 'application/json' })
  );

  if (picturePost) {
    formData.append('file', picturePost);
  }

  return this.http.put<Post>(
    this.backendUrl + environment.backend.endpoints.posts.update,
    formData
  );
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
