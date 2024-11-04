import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {User} from "../../shared/types/user.type";
import {UpdateProfileComponent} from "../update-profile/update-profile.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../service/userService";
import {Observable} from "rxjs";
import {Picture} from "../../shared/types/Picture.type";
import {NgIf} from '@angular/common';
import {environment} from "../../../environments/environments";

@Component({
  selector: 'app-aside-profile',
  standalone: true,
  imports: [
    MatIcon,
    UpdateProfileComponent,
    NgIf
  ],
  templateUrl: './aside-profile.component.html',
  styleUrl: './aside-profile.component.css'
})
export class AsideProfileComponent {
  private _userInfo!: User;
  private _formUpdateOpen!: boolean;
  @ViewChild('fileInput') fileInput!: ElementRef;
  defaultImage: string = environment.defaultImageProfile;

  constructor(private _dialog: MatDialog, private userService: UserService) {
    this._formUpdateOpen = false;
  }

  get userInfo() : User {
    return this._userInfo;
  }

  @Input()
  set userInfo(value: User) {
    this._userInfo = value;
  }

  isMyProfile() {
    return this.userService.getUserId() === this._userInfo._id;
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
    this.userService.uploadProfilePicture(this._userInfo._id, file).subscribe(
        response => {
          console.log("UPLOAD IMAGE!")
          console.log(response);
          this.userService.getProfilePicture(response.profilePicture).subscribe(
              (res) => {
                response.profilePicture = URL.createObjectURL(res)
                this._userInfo = response
                this.userService.userSubject.next(this._userInfo)
              });
        },
        error => console.log(error)
    );
  }
}
