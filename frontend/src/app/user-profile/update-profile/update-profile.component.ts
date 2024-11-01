import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatError} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {User} from "../../shared/types/user.type";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from "../../service/userService";
import {Subject} from "rxjs";

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatInput,
    MatDialogActions,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    MatError
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit {
  private _open!: boolean;
  private _form: FormGroup;
  private _refreshRequest: Subject<void>;

  constructor(private _dialogRef: MatDialogRef<UpdateProfileComponent, User>,
              private userService: UserService,
              @Optional() @Inject(MAT_DIALOG_DATA) private _user: User) {
    this._open = false;
    this._form = this.buildUpdateForm();
    this._refreshRequest = new Subject<void>();
  }

  get refreshRequest(): Subject<void> {
    return this._refreshRequest;
  }

  get user(): User {
    return this._user;
  }

  get form(): FormGroup {
    return this._form;
  }

  ngOnInit(): void {
    this._form.patchValue(this._user);
  }

  buildUpdateForm(): FormGroup {
    return new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      email: new FormControl('', [Validators.required, Validators.email]),
      bio: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)]))
    })
  }

  onCancel() {
    this._dialogRef.close()
  }

  onSubmit() {
    if(this._form.valid) {
      this.userService.updateUserInfos(this._user._id, this._form.value).subscribe(
          updatedUser => {
            this.onCancel();
          },
          error => console.log(error)
      )
    }
  }
}