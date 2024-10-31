import { Component } from '@angular/core';
import { MatIconButton } from "@angular/material/button";
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
        CommonModule
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

  logout(): void {
    this.userService.logout();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
