import { Component } from '@angular/core';
import { UserService } from '../../service/userService';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  login() {
    this.userService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login successful, token:', response.access_token);
        window.location.href = '/';
      },
      error => {
        this.errorMessage = "Échec de la connexion. Veuillez vérifier vos identifiants."
        console.error('Login failed', error);
      }
    );
  }
}
