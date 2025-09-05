import {ChangeDetectionStrategy, Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {User} from "../../shared/types/user.type";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from "../../service/userService";
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    MatDialogContent,
    MatInput,
    MatDialogActions,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    MatFormFieldModule, MatInputModule, MatDatepickerModule
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,


})
export class UpdateProfileComponent implements OnInit {
  private readonly _open!: boolean;
  private readonly _form: FormGroup;

  constructor(private readonly _dialogRef: MatDialogRef<UpdateProfileComponent, User>,
              private readonly userService: UserService,
              @Optional() @Inject(MAT_DIALOG_DATA) private readonly _user: User) {
    this._open = false;
    this._form = this.buildUpdateForm();
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
      bio: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
      birthday: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required)
    });
  }

  onCancel() {
    this._dialogRef.close()
  }

  onSubmit() {
    if (this._form.valid) {
      this.userService.updateUserInfos(this._user.id, this._form.value).subscribe(
        updatedUser => {
          this.onCancel();
        },
        error => console.log(error)
      )
    }
  }
}
