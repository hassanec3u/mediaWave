import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {Post} from "../types/post.type";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-card-post',
  standalone: true,
    imports: [
        MatIcon,
        MatMenu,
        MatMenuTrigger,
        DatePipe
    ],
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.css'
})
export class CardPostComponent {
    private _post!: Post;

    constructor() {
    }

    get post(): Post {
        return this._post;
    }

    @Input()
    set post(value: Post) {
        this._post = value;
    }
}
