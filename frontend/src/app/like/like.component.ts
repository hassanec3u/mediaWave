import {Component, Input, OnInit} from '@angular/core';
import { MatIconModule} from '@angular/material/icon';
import {LikeService} from '../service/likeService';
import {UserService} from '../service/userService';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  standalone: true,
  imports: [
    MatIconModule
  ],
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
  @Input() postId!: string;
  userId!: string;
  liked!: boolean ;
  likes! : number ;

  constructor(private likeService: LikeService,private userService : UserService) {}

  ngOnInit() {
    this.userId = this.userService.getUserId();
    this.updateLikes()
    this.checkIfLiked();
  }

  updateLikes(){
    this.likeService.getNumberOfLikes(this.postId).subscribe(likes => {
      this.likes = likes;
    });
  }

  checkIfLiked() {
    this.likeService.hasLikedPost(this.userId, this.postId).subscribe(hasLiked => {
      this.liked = hasLiked;
    });
  }

  toggleLike() {
    if (this.liked) {
      this.likeService.unlikePost(this.userId, this.postId).subscribe(() => {
        this.liked = false;
        this.likes = this.likes - 1;
        this.updateLikes();

      });
    } else {
      this.likeService.likePost(this.userId, this.postId).subscribe(() => {
        this.liked = true;
        this.likes = this.likes + 1;
        this.updateLikes();
      });
    }

  }
}
