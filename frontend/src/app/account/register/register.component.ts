import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/userService';
import { passwordSecurityValidator } from '../validators/password-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]]
    }, { validators: passwordSecurityValidator });
  }


  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs correctement.";
      return;
    }

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
        this.errorMessage = "Échec de l'inscription. Veuillez vérifier vos informations.";
        console.error('Registration failed', error);
      }
    );
  }

  getFirstError(): string | null {
    if (!this.submitted || !this.registerForm.errors) {
      return null;
    }

    const errorKeys = Object.keys(this.registerForm.errors);
    if (errorKeys.length > 0) {
      const firstErrorKey = errorKeys[0];
      const errorMessages: { [key: string]: string } = {
        passwordMismatch: 'Les mots de passe ne correspondent pas.',
        passwordTooShort: 'Le mot de passe doit contenir au moins 8 caractères.',
        passwordNoUpperCase: 'Le mot de passe doit contenir au moins une lettre majuscule.',
        passwordNoLowerCase: 'Le mot de passe doit contenir au moins une lettre minuscule.',
        passwordNoNumber: 'Le mot de passe doit contenir au moins un chiffre.',
        passwordNoSpecialChar: 'Le mot de passe doit contenir au moins un caractère spécial.'
      };
      return errorMessages[firstErrorKey];
    }

    return null;
  }

}
