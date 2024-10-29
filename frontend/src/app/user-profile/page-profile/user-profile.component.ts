import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatToolbarRow} from "@angular/material/toolbar";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIconButton} from "@angular/material/button";
import {HeaderComponent} from "../../shared/header/header.component";
import {CardPostComponent} from "../../shared/card-post/card-post.component";
import {AsideProfileComponent} from "../aside-profile/aside-profile.component";

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
export class UserProfileComponent {

  protected readonly menubar = menubar;
}