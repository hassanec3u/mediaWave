import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatToolbarRow } from "@angular/material/toolbar";
import { Router } from '@angular/router';
import { UserService } from '../../service/userService';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatToolbarRow,
    MatMenuTrigger,
    CommonModule,
    MatButton
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAuthenticated: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuthenticated(); // Check authentication status
  }



  login(): void {
    this.router.navigate(['/login']);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }


  register(): void {
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

  navigateHome() {
    this.router.navigate(['/']);
  }
}
