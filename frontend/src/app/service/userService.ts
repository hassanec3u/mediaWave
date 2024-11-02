import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject, tap} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {environment} from "../../environments/environments";
import {User} from "../shared/types/user.type";


interface LoginResponse {
  access_token: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiBackendUrl = `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;
  private readonly _refreshRequest: Subject<void>;
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this._refreshRequest = new Subject<void>();
  }

  get refreshRequest(): Subject<void> {
    return this._refreshRequest;
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {username, password}).pipe(
      tap(response => {
        this.cookieService.set('access_token', response.access_token);
        this.cookieService.set('userId', response.userId);

      })
    );
  }

  isAuthenticated(): boolean {
    return this.cookieService.check('access_token');
  }


  register(username: string, email: string, password: string, passwordConfirm: string): Observable<LoginResponse> {
    return this.http.post<any>(`${this.apiUrl}/register`, {username, email, password, passwordConfirm});
  }

  logout() {
    this.cookieService.delete('access_token');
    this.cookieService.delete('userId');
    window.location.href = '/login';
  }

  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiBackendUrl}/user/search`, {params: {query}});
  }

  sendFriendRequest(myId: String, friendId: string): Observable<any> {
    return this.http.post<any>(`${this.apiBackendUrl}/user/${myId}/friends/${friendId}`, {});
  }

  removeFriend(myId: String,friendIdToRemove: string): Observable<void> {
    return this.http.delete<any>(`${this.apiBackendUrl}/user/${myId}/friends/${friendIdToRemove}`);
  }

  getFriends(myId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiBackendUrl}/user/${myId}/friends`);
  }

  getPendingRequests(myId:string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiBackendUrl}/user/${myId}/friends/pending`);
  }
  acceptFriend(myId: string, userId: string) {
    return this.http.post<any>(`${this.apiBackendUrl}/user/${myId}/friends/${userId}/accept`, {});
  }

  refuseFriend(myId: string, userId: string) {
    return this.http.delete<any>(`${this.apiBackendUrl}/user/${myId}/friends/${userId}/refuse`);
  }

  getUserInfos(id: string): Observable<User> {
    return this.http.get<User>(this.apiBackendUrl + environment.backend.endpoints.userInfo + id);
  }

  getUserId(): string {
    return this.cookieService.get('userId');
  }

  updateUserInfos(id: string, userInfo: User): Observable<User> {
    return this.http.put<User>(this.apiBackendUrl + environment.backend.endpoints.updateUserInfo + id, userInfo).pipe(
      tap(() => this.refreshRequest.next())
    );
  }
}
