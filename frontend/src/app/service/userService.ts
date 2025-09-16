import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, switchMap, tap} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {environment} from "../../environments/environments";
import {User} from "../shared/types/user.type";


interface LoginResponse {
  token: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly backendUrl = `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;

  userSubject = new BehaviorSubject<User>({id: "0"});
  public user = this.userSubject.asObservable();

  constructor(private readonly http: HttpClient, private readonly cookieService: CookieService) {
  }


  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.backendUrl + environment.backend.endpoints.auth.login, {username, password}).pipe(
      tap(response => {
        this.cookieService.set('access_token', response.token);
        this.cookieService.set('userId', response.userId);

      })
    );
  }


  isAuthenticated(): boolean {
    return this.cookieService.check('access_token');
  }

  getToken(): string {
    return this.cookieService.get('access_token');
  }


  register(username: string, email: string, password: string, passwordConfirm: string): Observable<LoginResponse> {
    return this.http.post<any>(this.backendUrl + environment.backend.endpoints.auth.register, {username, email, password, passwordConfirm});
  }

  logout() {
    this.cookieService.delete('access_token');
    this.cookieService.delete('userId');
    window.location.href = '/login';
  }

  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(this.backendUrl + environment.backend.endpoints.user.friends.search, {params: {query}});
  }

  sendFriendRequest( friendId: string): Observable<any> {
    return this.http.post<void>(this.backendUrl + environment.backend.endpoints.user.friends.add(friendId), {});
  }

  removeFriend( friendIdToRemove: string): Observable<void> {
    return this.http.delete<void>(this.backendUrl + environment.backend.endpoints.user.friends.remove(friendIdToRemove));
  }

  getFriends(): Observable<User[]> {
    return this.http.get<User[]>(this.backendUrl + environment.backend.endpoints.user.friends.list);
  }

  getPendingRequests(): Observable<User[]> {
    return this.http.get<User[]>(this.backendUrl + environment.backend.endpoints.user.friends.pending);
  }

  acceptFriend( friendId: string) {
    return this.http.post<void>(this.backendUrl + environment.backend.endpoints.user.friends.accept(friendId), {});
  }

  refuseFriend( friendId: string) {
    return this.http.delete<void>(this.backendUrl + environment.backend.endpoints.user.friends.refuse(friendId));
  }

  getUserInfos(id: string): Observable<User> {
    return this.http.get<User>(this.backendUrl + environment.backend.endpoints.user.info);
  }

  //Get current user
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.backendUrl + environment.backend.endpoints.user.info).pipe(
      tap(user => {
          this.userSubject.next(user);
        
      })
    );
  }

  updateUserInfos(id: string, userInfo: User): Observable<User> {
    console.log(userInfo);
    return this.http.put<User>(this.backendUrl + environment.backend.endpoints.user.update(id), userInfo).pipe(
      tap((user) => {
        user.profilePicture = this.userSubject.value.profilePicture;
        this.userSubject.next(user)
      })
    );
  }

  uploadProfilePicture(id: string, profilePicture: File): Observable<User> {
    const formData = new FormData();
    formData.append('file', profilePicture);
    return this.http.post<string>(this.backendUrl + environment.backend.endpoints.user.uploadProfilePicture, formData, {
      headers: new HttpHeaders({'enctype': 'multipart/form-data'})
    }).pipe(
      switchMap((response) => this.updateProfilePicture(id, response))
    );
  }

  updateProfilePicture(id: string, profilePicture: string): Observable<any> {
    console.log("Update profile picture");
    console.log(profilePicture);
    return this.http.put(this.backendUrl + environment.backend.endpoints.user.uploadProfilePicture + id, {profilePicture});
  }


  loadUserInfo() {
    this.getCurrentUser().subscribe(user => {
      
        this.userSubject.next(user);
      
    });
  }
}
