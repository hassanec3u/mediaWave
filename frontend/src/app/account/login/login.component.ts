import { Component } from '@angular/core';
import { UserService } from '../../service/userService';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService,private cookieService :CookieService) {}

  login() {
    this.userService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login successful, token:', response.token);

        this.cookieService.set('authToken', response.token);
        window.location.href = '/';
      },
      error => {
        this.errorMessage = "Échec de la connexion. Veuillez vérifier vos identifiants."
        console.error('Login failed', error);
      }
    );
  }
}
