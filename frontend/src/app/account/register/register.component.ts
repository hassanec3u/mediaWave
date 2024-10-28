import { Component } from '@angular/core';
import { UserService } from '../../service/userService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  passwordConfirm: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  register() {
    if (this.password !== this.passwordConfirm) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    this.userService.register(this.username,this.email, this.password,this.passwordConfirm).subscribe(
        response => {
          console.log('Registration successful:', response);
          // Redirection vers la page de connexion
          window.location.href = '/';
        },
        error => {
          this.errorMessage = "Échec de l'inscription. Veuillez vérifier vos informations.";
          console.error('Registration failed', error);
        }
    );
  }
}
