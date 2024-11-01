import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {User} from "../../shared/types/user.type";
import {UpdateProfileComponent} from "../update-profile/update-profile.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-aside-profile',
  standalone: true,
  imports: [
    MatIcon,
    UpdateProfileComponent
  ],
  templateUrl: './aside-profile.component.html',
  styleUrl: './aside-profile.component.css'
})
export class AsideProfileComponent {
  private _userInfo!: User;
  private _formUpdateOpen!: boolean;

  constructor(private _dialog: MatDialog) {
    this._formUpdateOpen = false;
  }

  get userInfo() : User {
    return this._userInfo;
  }

  @Input()
  set userInfo(value: User) {
    this._userInfo = value;
  }

  openFormUpdate() {
    this._dialog.open(UpdateProfileComponent, {
      width: '500px',
      disableClose: true,
      data: this._userInfo
    })
  }
}
