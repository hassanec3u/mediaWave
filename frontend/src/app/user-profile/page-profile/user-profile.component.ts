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
import {Post} from "../../shared/types/post.type";
import {PostService} from "../../service/postService";
import {NgForOf} from "@angular/common";
import {catchError, forkJoin, map, mergeMap, of, switchMap} from "rxjs";

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
    AsideProfileComponent,
    NgForOf
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  private _user!: User;
  private id!: string;
  userPosts!: Post[]

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private postService: PostService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getUserInfo(this.id);
    this.userService.refreshRequest.subscribe((res) => this.getUserInfo(this.id));
    this.getUserPosts();
  }

  get user(): User {
    return this._user;
  }

  getUserInfo(id: string) {
    this.userService.getUserInfos(id).subscribe(
        response => {
          this._user = response;
          this.userService.getProfilePicture(this._user.profilePicture).subscribe(
              (res) => this._user.profilePicture = URL.createObjectURL(res));
          },
        error => console.log(error));
  }

  getUserPosts() {
    this.postService.getUserPosts().pipe(
        switchMap(posts => {
          const postsWithImages$ = posts.map(post =>
              this.userService.getProfilePicture(post.postPicture).pipe(
                  map(image => ({...post, postPicture: URL.createObjectURL(image)})),
                  catchError(error => {
                    console.error(`Erreur pour le post ${post._id}:`, error);
                    return of(post);
                  })
              )
          );
          return forkJoin(postsWithImages$);
        })).subscribe(
        response => this.userPosts = response,
        error => console.log(error)
    )
  }

  onPostDeleted(postId: string) {
      this.userPosts = this.userPosts.filter(post => post._id !== postId);
  }

  onPostUpdated(updatePost: Post) {
      const postIndex = this.userPosts.findIndex(post => post._id === updatePost._id);
      if(postIndex !== -1) {
          this.userPosts[postIndex] = updatePost;
      }
  }
}
