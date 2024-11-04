import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { HeaderComponent } from '../shared/header/header.component';
import { UserService } from '../service/userService';
import {NgForOf, NgIf} from '@angular/common';
import {PostsComponent} from "../posts/posts.component";
import {CardPostComponent} from "../shared/card-post/card-post.component";
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
    PostsComponent,
    CardPostComponent,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  friendsPosts!: Post[];
  constructor(private router: Router,
              private userService: UserService,
              private postService: PostService,
              private pictureService: PicturesService) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }


  navigateToProfile() {
    const userId = this.userService.getUserId();
    console.log('User ID:', userId);
    if (userId) {
      this.router.navigate([`/profile/${userId}`]);
    } else {
      console.error('User ID not found');
    }
  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  ngOnInit(): void {
    this.postService.getFriendsPosts().pipe(
        switchMap(posts => {
          const postsWithImages$ = posts.map(post =>
              this.pictureService.getPicture(post.postPicture).pipe(
                  map(image => ({...post, postPicture: URL.createObjectURL(image)})),
                  catchError(error => {
                    console.error(`Erreur pour le post ${post._id}:`, error);
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
