import {Component, Input, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {LikeService} from '../service/likeService';
import {CookieService} from 'ngx-cookie-service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  standalone: true,
  imports: [
    MatIconModule,
    NgClass
  ],
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
  @Input() postId!: string;
  userId!: string;
  liked!: boolean ;
  likes! : number ;

  constructor(private readonly likeService: LikeService,private readonly cookieService :CookieService) {
  }

  ngOnInit() {
    this.userId = this.cookieService.get('userId');
    this.updateLikes()
    this.checkIfLiked();
  }

  updateLikes(){
    this.likeService.getNumberOfLikes(this.postId).subscribe(likes => {
      this.likes = likes;
    });
  }

  checkIfLiked() {
    this.likeService.hasLikedPost( this.postId).subscribe(hasLiked => {
      this.liked = hasLiked;
    });
  }

  toggleLike() {
    if (this.liked) {
      this.likeService.unlikePost( this.postId).subscribe(() => {
        this.liked = false;
        this.likes = this.likes - 1;
      });
    } else {
      this.likeService.likePost( this.postId).subscribe(() => {
        this.liked = true;
        this.likes = this.likes + 1;
      });
    }

  }
}
