import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private readonly backendUrl = `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;

  constructor(private readonly http: HttpClient) {}

  likePost( postId: string): Observable<void> {
    return this.http.post<void>(this.backendUrl + environment.backend.endpoints.posts.likes.like(postId), {});
  }

  unlikePost( postId: string): Observable<void> {
    return this.http.delete<void>(this.backendUrl + environment.backend.endpoints.posts.likes.unlike(postId));
  }

  hasLikedPost( postId: string): Observable<boolean> {
    return this.http.get<boolean>(this.backendUrl + environment.backend.endpoints.posts.likes.hasLiked(postId));
  }

  getNumberOfLikes(postId: string): Observable<number> {
    return this.http.get<number>(this.backendUrl + environment.backend.endpoints.posts.likes.count(postId));
  }
}
