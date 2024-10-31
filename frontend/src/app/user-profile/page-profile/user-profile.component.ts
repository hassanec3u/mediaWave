import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatToolbarRow} from "@angular/material/toolbar";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIconButton} from "@angular/material/button";
import {HeaderComponent} from "../../shared/header/header.component";
import {CardPostComponent} from "../../shared/card-post/card-post.component";
import {AsideProfileComponent} from "../aside-profile/aside-profile.component";
import {UserService} from "../../service/userService";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../shared/types/user.type";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    MatIcon,
    MatToolbarRow,
    MatMenuTrigger,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    HeaderComponent,
    CardPostComponent,
    AsideProfileComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  private _user!: User;
  private username!: string;

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.params['username'];
    this.userService.getUserInfos(this.username).subscribe(
        response => this._user = response,
        error => console.log(error))
  }

  get user(): User {
    return this._user;
  }
}
