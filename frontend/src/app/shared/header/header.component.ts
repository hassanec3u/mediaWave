import { Component } from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbarRow} from "@angular/material/toolbar";

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [
        MatIconButton,
        MatMenu,
        MatMenuItem,
        MatToolbarRow,
        MatMenuTrigger
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
