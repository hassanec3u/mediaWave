import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatToolbarRow } from "@angular/material/toolbar";
import { Router } from '@angular/router';
import { UserService } from '../../service/userService';
import { CommonModule } from '@angular/common';
import {User} from "../types/user.type";
import {PicturesService} from "../../service/picturesService";
import {environment} from "../../../environments/environments"; // Import CommonModule

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
export class HeaderComponent implements OnInit{
  isAuthenticated: boolean = false;
  user!: User | undefined;
  defaultImage: string = environment.defaultImageProfile;

  constructor(private router: Router, private userService: UserService, private pictureService: PicturesService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuthenticated(); // Check authentication status
    this.userService.loadUserInfo();
    this.userService.user.subscribe((user) => this.user = user);
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
    const userId = this.userService.getUserId();
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
}
