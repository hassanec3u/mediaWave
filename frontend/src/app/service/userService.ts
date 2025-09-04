import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, switchMap, tap} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {environment} from "../../environments/environments";
import {User} from "../shared/types/user.type";
import {Picture} from "../shared/types/Picture.type";


interface LoginResponse {
  token: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiBackendUrl = `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;
  private readonly apiUrl = 'http://localhost:8080/auth';

  userSubject = new BehaviorSubject<User>({id: "0"});
  public user = this.userSubject.asObservable();

  constructor(private readonly http: HttpClient, private readonly cookieService: CookieService) {
  }


  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {username, password}).pipe(
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

  sendFriendRequest( friendId: string): Observable<any> {
    return this.http.post<any>(`${this.apiBackendUrl}/user/friends/${friendId}`, {});
  }

  removeFriend( friendIdToRemove: string): Observable<void> {
    return this.http.delete<any>(`${this.apiBackendUrl}/user/friends/${friendIdToRemove}`);
  }

  getFriends(myId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiBackendUrl}/user/friends`);
  }

  getPendingRequests(friendId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiBackendUrl}/user/friends/pending`);
  }

  acceptFriend( friendId: string) {
    return this.http.post<any>(`${this.apiBackendUrl}/user/friends/${friendId}/accept`, {});
  }

  refuseFriend( friendId: string) {
    return this.http.delete<any>(`${this.apiBackendUrl}/user/friends/${friendId}/refuse`);
  }

  getUserInfos(id: string): Observable<User> {
    return this.http.get<User>(this.apiBackendUrl + environment.backend.endpoints.user.info);
  }

  getUserId(): string {
    return this.cookieService.get('userId');
  }

  //Get current user
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.apiBackendUrl + environment.backend.endpoints.user.info).pipe(
      tap(user => {
        if (user.profilePicture) {
          this.getProfilePicture(user.profilePicture).subscribe(
            picture => {
              user.profilePicture = URL.createObjectURL(picture);
              this.userSubject.next(user);
            }
          );
        } else {
          this.userSubject.next(user);
        }
      })
    );
  }

  updateUserInfos(id: string, userInfo: User): Observable<User> {
    console.log(userInfo);
    return this.http.put<User>(this.apiBackendUrl + environment.backend.endpoints.user.update(id), userInfo).pipe(
      tap((user) => {
        user.profilePicture = this.userSubject.value.profilePicture;
        this.userSubject.next(user)
      })
    );
  }

  uploadProfilePicture(id: string, profilePicture: File): Observable<User> {
    const formData = new FormData();
    formData.append('file', profilePicture);
    return this.http.post<Picture>(this.apiBackendUrl + environment.backend.endpoints.upload, formData, {
      headers: new HttpHeaders({'enctype': 'multipart/form-data'})
    }).pipe(
      switchMap((response) => this.updateProfilePicture(id, response.filePath))
    );
  }

  updateProfilePicture(id: string, profilePicture: string): Observable<any> {
    console.log("Update profile picture");
    console.log(profilePicture);
    return this.http.put(this.apiBackendUrl + environment.backend.endpoints.upload + id, {profilePicture});
  }

  getProfilePicture(profilePicturePath: string | undefined): Observable<any> {
    console.log("GET PROFILE PICTURE");
    const params = new HttpParams().set('filePath', profilePicturePath + '');
    return this.http.get<any>(this.apiBackendUrl + environment.backend.endpoints.upload, {
      params,
      responseType: 'blob' as 'json'
    });
  }


  loadUserInfo() {
    this.getCurrentUser().subscribe(user => {
      if (user.profilePicture) {
        this.getProfilePicture(user.profilePicture).subscribe(
          picture => {
            user.profilePicture = URL.createObjectURL(picture);
            this.userSubject.next(user);
          }
        );
      } else {
        this.userSubject.next(user);
      }
    });
  }
}
