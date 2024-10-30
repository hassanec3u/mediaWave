import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {User} from "../../shared/types/user.type";

@Component({
  selector: 'app-aside-profile',
  standalone: true,
    imports: [
        MatIcon
    ],
  templateUrl: './aside-profile.component.html',
  styleUrl: './aside-profile.component.css'
})
export class AsideProfileComponent {
  private _userInfo!: User;

  get userInfo() : User {
    return this._userInfo;
  }

  @Input()
  set userInfo(value: User) {
    this._userInfo = value;
  }
}
