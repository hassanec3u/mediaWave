import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { HeaderComponent } from '../shared/header/header.component';
import { UserService } from '../service/userService';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButton,
    HeaderComponent,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router, private userService: UserService) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }


  navigateToProfile() {
    const userId = this.userService.getUserId();
    console.log('User ID:', userId);
    if (userId) {
      this.router.navigate([`/profile/${userId}`]);
    } else {
      console.error('User ID not found');
    }
  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }
}
