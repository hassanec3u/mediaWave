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
import {PicturesService} from "../service/picturesService";

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
              private readonly postService: PostService,
              private readonly pictureService: PicturesService) {
  }


  ngOnInit(): void {
    this.postService.getFriendsPosts().pipe(
      switchMap(posts => {
        const postsWithImages$ = posts.map(post =>
          this.pictureService.getPicture(post.postPicture).pipe(
            map(image => ({...post, postPicture: URL.createObjectURL(image)})),
            catchError(error => {
              console.error(`Erreur pour le post ${post.id}:`, error);
              return of(post);
            })
          )
        );
        return forkJoin(postsWithImages$);
      })).subscribe(
      response => this.friendsPosts = response,
      error => console.log(error)
    )
  }
}
