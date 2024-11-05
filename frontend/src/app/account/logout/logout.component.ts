import { Component } from '@angular/core';
import { UserService } from '../../service/userService';

@Component({
  selector: 'app-logout',
  template: '<p>Déconnexion en cours...</p>',
})
export class LogoutComponent {
  constructor(private userService: UserService) {
    this.userService.logout();
  }
}
