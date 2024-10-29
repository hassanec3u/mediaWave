import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/userService';
import {passwordSecurityValidator} from '../validators/passwordSecurityValidator';
import {passwordMatchValidator} from '../validators/passwordMatchValidator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  /**
   * Hide the password input
   */
  hide: boolean = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.preventDefault();
    event.stopPropagation();
  }

  registerForm!: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordSecurityValidator()]],
      passwordConfirm: ['', [Validators.required]]
    },{ validators: passwordMatchValidator });
  }


  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    // Register the user  with the UserService
    this.userService.register(
      this.registerForm.value.username.toLowerCase(),
      this.registerForm.value.email.toLowerCase(),
      this.registerForm.value.password,
      this.registerForm.value.passwordConfirm
    ).subscribe(
      response => {
        console.log('Registration successful:', response);
        window.location.href = '/';
      },
      error => {

        //check if the error is a 409 (Conflict) error
        if (error.status === 409) {
          this.registerForm.setErrors({ conflict: 'Username or email already exists.' });
          return;
        }

        console.error('Registration failed', error);
      }
    );
  }

  getPasswordErrorMessage() {
    const passwordControl = this.registerForm.get('password');

    if (passwordControl?.hasError('required')) {
      return 'Ce champ est requis.';
    }
    if (passwordControl?.hasError('passwordTooShort')) {
      return 'Le mot de passe doit contenir au moins 8 caractères.';
    }
    if (passwordControl?.hasError('passwordNoUpperCase')) {
      return 'Le mot de passe doit contenir au moins une lettre majuscule.';
    }
    if (passwordControl?.hasError('passwordNoLowerCase')) {
      return 'Le mot de passe doit contenir au moins une lettre minuscule.';
    }
    if (passwordControl?.hasError('passwordNoNumber')) {
      return 'Le mot de passe doit contenir au moins un chiffre.';
    }
    if (passwordControl?.hasError('passwordNoSpecialChar')) {
      return 'Le mot de passe doit contenir au moins un caractère spécial.';
    }
    return '';
  }

}
