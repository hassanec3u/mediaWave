import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {HeaderComponent} from '../shared/header/header.component';
import {UserService} from '../service/userService';
import {NgForOf, NgIf} from '@angular/common';
import {PostFormComponent} from "../posts/post-form/post-form.component";
import {PostCardComponent} from "../posts/post-card/post-card.component";
import {PostService} from "../service/postService";
import {Post} from "../shared/types/post.type";
import {catchError, forkJoin, map, of, switchMap} from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButton,
    HeaderComponent,
    NgIf,
    PostFormComponent,
    PostCardComponent,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friendsPosts!: Post[];

  constructor(private readonly router: Router,
              private readonly userService: UserService,
              private readonly postService: PostService) {
  }


  ngOnInit(): void {
  this.postService.getFriendsPosts().subscribe(
    response => this.friendsPosts = response,
    error => console.log(error)
  );
}
}
