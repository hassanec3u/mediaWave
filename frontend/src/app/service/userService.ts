import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';


interface LoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {username, password}).pipe(
      tap(response => {
        this.cookieService.set('access_token', response.access_token);
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
    window.location.href = '/login';
  }

}
