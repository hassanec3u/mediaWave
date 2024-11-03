import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../shared/types/comment.type';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) {
  }

  getComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${postId}`);
  }

  addComment(comment: Comment, postId: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}`, comment );  }

  deleteComment(commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${commentId}`);
  }
}
