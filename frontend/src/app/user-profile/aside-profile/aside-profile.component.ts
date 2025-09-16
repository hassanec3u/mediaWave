import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {User} from "../../shared/types/user.type";
import {UpdateProfileComponent} from "../update-profile/update-profile.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../service/userService";
import {NgIf} from '@angular/common';
import {environment} from "../../../environments/environments";
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-aside-profile',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './aside-profile.component.html',
  styleUrl: './aside-profile.component.css'
})
export class AsideProfileComponent {

  private _userInfo!: User;
  @ViewChild('fileInput') fileInput!: ElementRef;
  defaultImage: string = environment.defaultImageProfile;

  // Ajout des nouvelles propriétés
  pays!: string;
  birthdate!: string;

  constructor(private readonly _dialog: MatDialog,
              private readonly userService: UserService,
              private readonly cookieService: CookieService) {
  }

  get userInfo(): User {
    return this._userInfo;
  }

  @Input()
  set userInfo(value: User) {
    this._userInfo = value;
    this.pays = this._userInfo.pays ? this._userInfo.pays : 'Non renseigné';
    this.birthdate = this._userInfo.birthday ? new Date(this._userInfo.birthday).toLocaleDateString() : 'Non renseigné';
  }

  isMyProfile() {
    return this.cookieService.get('userId') === this._userInfo.id;
  }

  openFormUpdate() {
    this._dialog.open(UpdateProfileComponent, {
      width: '500px',
      disableClose: true,
      data: this._userInfo
    })
  }

  onProfileImageClick() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.uploadProfileImage(file);
      console.log(file.name)
    }
  }

  uploadProfileImage(file: File) {
    this.userService.uploadProfilePicture(this._userInfo.id, file).subscribe(
    );
  }
}
