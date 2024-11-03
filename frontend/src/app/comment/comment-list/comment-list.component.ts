import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from '../../service/commentService';
import {Comment} from '../../shared/types/comment.type';
import {UserService} from '../../service/userService';
import {DatePipe, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';


@Component({
  selector: 'app-comment-list',
  standalone: true,
  templateUrl: './comment-list.component.html',
  imports: [
    DatePipe,
    FormsModule,
    NgForOf,
    MatFormField,
    MatButton,
    MatInput
  ],
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() postId!: string;
  comments: Comment[] = [];
  newComment = '';

  constructor(private commentService: CommentService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.commentService.getComments(this.postId).subscribe(comments => {
      this.comments = comments;});
  }

  addComment(newComment: string): void {
    const comment: Comment = {
      author: this.userService.getUserId(),
      post: this.postId,
      content: newComment
    };
    this.commentService.addComment(comment, this.postId).subscribe(newComment => {
      this.comments.push(newComment);
      this.newComment = '';
    });
  }


  deleteComment(commentId: string): void {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.comments = this.comments.filter(comment => comment._id !== commentId);
    });
  }

}
