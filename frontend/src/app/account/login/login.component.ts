import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/userService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Hide the password input
   */
  hide: boolean = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.preventDefault();
    event.stopPropagation();
  }

  login(): void {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      this.userService.login(username, password).subscribe(
        response => {
          console.log('Login successful, token:', response.access_token);
          window.location.href = '/';
        },
        error => {
          this.loginForm.setErrors({loginFailed: "Verifier vos identifiants"});
          console.error('Login failed', error);
        })
    }
  }
}
