import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service/userService';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {}

    canActivate(): boolean {
        if (this.userService.isAuthenticated()) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}