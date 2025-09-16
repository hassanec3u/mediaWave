import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../shared/header/header.component";
import {PostCardComponent} from "../../posts/post-card/post-card.component";
import {AsideProfileComponent} from "../aside-profile/aside-profile.component";
import {UserService} from "../../service/userService";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../shared/types/user.type";
import {Post} from "../../shared/types/post.type";
import {PostService} from "../../service/postService";
import {NgForOf} from "@angular/common";
import {catchError, forkJoin, map, of, switchMap} from "rxjs";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    HeaderComponent,
    PostCardComponent,
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

  constructor(private readonly userService: UserService,
              private readonly route: ActivatedRoute,
              private readonly postService: PostService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getUserInfo();
    this.getUserPosts();
  }

  get user(): User {
    return this._user;
  }

  getUserInfo() {
      this.userService.loadUserInfo();
      this.userService.user.subscribe((res) => this._user = res);
  }

getUserPosts() {
    this.postService.getUserPosts().subscribe(
        posts => this.userPosts = posts,
        error => console.log(error)
    );
}
  onPostDeleted(postId: string) {
      this.userPosts = this.userPosts.filter(post => post.id !== postId);
  }

  onPostUpdated(updatePost: Post) {
      const postIndex = this.userPosts.findIndex(post => post.id === updatePost.id);
      if(postIndex !== -1) {
          this.userPosts[postIndex] = updatePost;
      }
  }
}
