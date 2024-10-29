import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-card-post',
  standalone: true,
    imports: [
        MatIcon,
        MatMenu,
        MatMenuTrigger
    ],
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.css'
})
export class CardPostComponent {

}
