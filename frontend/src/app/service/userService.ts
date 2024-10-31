import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {environment} from "../../environments/environments";
import {User} from "../shared/types/user.type";


interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiBackendUrl = `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(username: string, password: string): Observable<LoginResponse> {

    console.log(`${this.apiUrl}/login`);
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password });
  }


  register(username: string, email: string, password: string,passwordConfirm : string): Observable<LoginResponse> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username,email, password,passwordConfirm });
  }

  logout() {
    this.cookieService.delete('authToken');
    window.location.href = '/login';
  }

  getUserInfos(username: string): Observable<User> {
    return this.http.get<User>(this.apiBackendUrl+environment.backend.endpoints.userInfo + username);
  }

  updateUserInfos(id: string, userInfo: User): Observable<User> {
    return this.http.put<User>(this.apiBackendUrl+environment.backend.endpoints.updateUserInfo + id, userInfo);
  }
}
