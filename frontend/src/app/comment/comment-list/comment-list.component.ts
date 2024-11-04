import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from '../../service/commentService';
import {Comment} from '../../shared/types/comment.type';
import {UserService} from '../../service/userService';
import {DatePipe, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {detailedComment} from '../../shared/types/detailedComment';


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
  detailedComment: detailedComment[] = [];
  newComment = '';

  constructor(private commentService: CommentService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.commentService.getComments(this.postId).subscribe(detailedComment => {
      this.detailedComment = detailedComment;
    });
  }

  addComment(newComment: string): void {
    const comment: Comment = {
      author: this.userService.getUserId(),
      post: this.postId,
      content: newComment
    };

    this.commentService.addComment(comment).subscribe(newComment => {

      //convert newComment to detailedComment
      const detailedComment: detailedComment = {
        _id: newComment._id,
        author: {
          _id: newComment.author._id,
          username: newComment.author.username
        },
        post: newComment.post,
        content: newComment.content
      }
      this.detailedComment.push(detailedComment);
      this.newComment = '';
    });
  }


  deleteComment(commentId: string): void {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.detailedComment = this.detailedComment.filter(comment => comment._id !== commentId);
    });
  }

}
