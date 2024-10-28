import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

}
