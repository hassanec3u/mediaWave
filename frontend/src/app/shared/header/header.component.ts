import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../service/userService';
import {CommonModule} from '@angular/common';
import {User} from "../types/user.type";
import {environment} from "../../../environments/environments";
import {CookieService} from 'ngx-cookie-service'; // Import CommonModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  user!: User | undefined;
  defaultImage: string = environment.defaultImageProfile;

  constructor(private readonly router: Router, private readonly userService: UserService,
              private readonly cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuthenticated(); // Check authentication status
    this.userService.loadUserInfo();
    this.userService.user$.subscribe((user) => {
      this.user = user ? user : undefined;
    });
  }


  login(): void {
    this.router.navigate(['/login']);
  }

  logout() {
    this.userService.logout();

  }

  register(): void {
    this.router.navigate(['/register']);
  }

  navigateToProfile() {
    const userId = this.cookieService.get('userId');
    console.log('User ID:', userId);
    if (userId) {
      this.router.navigate([`/profile/${userId}`]);
    } else {
      console.error('User ID not found');
    }
  }

  navigateToFriend() {
    this.router.navigate(['/friend']);
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  navigateToConversations() {
    this.router.navigate(['/messagerie']);
  }
}

