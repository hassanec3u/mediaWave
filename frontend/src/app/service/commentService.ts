import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../shared/types/comment.type';
import {environment} from '../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly backendUrl = `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;

  constructor(private http: HttpClient) {
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.backendUrl + environment.backend.endpoints.posts.comments.add(comment.postId), comment);
  }

  getComments(postId: string): Observable<Comment[]> {
    const url = this.backendUrl + environment.backend.endpoints.posts.comments.list(postId);
    return this.http.get<Comment[]>(url);
  }


  deleteComment(postId: string, commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.backendUrl + environment.backend.endpoints.posts.comments.delete(postId, commentId)}`);
  }
}
