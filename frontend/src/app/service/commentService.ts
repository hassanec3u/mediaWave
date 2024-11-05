import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../shared/types/comment.type';
import {detailedComment} from '../shared/types/detailedComment';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) {
  }

  getComments(postId: string): Observable<detailedComment[]> {
    return this.http.get<detailedComment[]>(`${this.apiUrl}/${postId}`);
  }

  addComment(comment: Comment): Observable<detailedComment> {
    return this.http.post<detailedComment>(`${this.apiUrl}`, comment );  }

  deleteComment(commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${commentId}`);
  }
}
