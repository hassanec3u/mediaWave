import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service/userService';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private readonly userService: UserService, private readonly router: Router) {}

    canActivate(): boolean {
        if (this.userService.isAuthenticated()) {
            return true;
        }else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
