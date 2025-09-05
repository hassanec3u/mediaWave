import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../service/userService';
import {Router} from '@angular/router';

type LoginForm = FormGroup<{
  username: FormControl<string>;
  password: FormControl<string>;
}>;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
  loginForm!: LoginForm;
  submitted = false;
  hide = true; // toggle mot de passe

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control('', {validators: [Validators.required]}),
      password: this.fb.control('', {validators: [Validators.required]}),
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  togglePasswordVisibility(event: MouseEvent) {
    this.hide = !this.hide;
    event.preventDefault();
    event.stopPropagation();
  }

  login(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const {username, password} = this.loginForm.getRawValue(); // types sûrs
    this.userService.login(username, password).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        // erreur globale affichée dans le template
        this.loginForm.setErrors({loginFailed: 'Vérifiez vos identifiants'});
        console.error('Login failed', err);
      },
    });
  }
}
