import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private apiUrl = 'http://localhost:3000/likes';

  constructor(private http: HttpClient) {}

  likePost(userId: string, postId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${postId}/user/${userId}`, {});
  }

  unlikePost(userId: string, postId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${postId}/user/${userId}`);
  }

  hasLikedPost(userId: string, postId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${postId}/user/${userId}/has-liked`);
  }

  getNumberOfLikes(postId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${postId}`);
  }
}
