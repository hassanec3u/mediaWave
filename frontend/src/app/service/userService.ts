import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject, switchMap, tap} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {environment} from "../../environments/environments";
import {User} from "../shared/types/user.type";
import {Picture} from "../shared/types/Picture.type";


interface LoginResponse {
  access_token: string;
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
     })
    );
  }


  register(username: string, email: string, password: string, passwordConfirm: string): Observable<LoginResponse> {
    return this.http.post<any>(`${this.apiUrl}/register`, {username, email, password, passwordConfirm});
  }

  logout() {
    this.cookieService.delete('access_token');
    window.location.href = '/login';
  }

  getUserInfos(id: string): Observable<User> {
    return this.http.get<User>(this.apiBackendUrl+environment.backend.endpoints.userInfo + id);
  }

  updateUserInfos(id: string, userInfo: User): Observable<User> {
    return this.http.put<User>(this.apiBackendUrl+environment.backend.endpoints.updateUserInfo + id, userInfo).pipe(
        tap(() => this.refreshRequest.next())
    );
  }

  uploadProfilePicture(id: string, profilePicture: File): Observable<User> {
    const formData = new FormData();
    formData.append('file', profilePicture);
    return this.http.post<Picture>(this.apiBackendUrl+environment.backend.endpoints.uploadPicture, formData, {
      headers: new HttpHeaders({'enctype': 'multipart/form-data'})}).pipe(
          switchMap((response) => this.updateProfilePicture(id, response.filePath))
    );
  }

  updateProfilePicture(id: string, profilePicture: string): Observable<any> {
    console.log("Update profile picture");
    console.log(profilePicture);
    return this.http.put(this.apiBackendUrl+environment.backend.endpoints.updateProfilePicture+id, {profilePicture});
  }

  getProfilePicture(profilePicturePath: string | undefined): Observable<any> {
    console.log("GET PROFILE PICTURE");
    const params = new HttpParams().set('filePath', profilePicturePath+'');
    return this.http.get<any>(this.apiBackendUrl+environment.backend.endpoints.uploadPicture, {params, responseType: 'blob' as 'json'});
  }
}
