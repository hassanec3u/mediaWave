import {Component, Input, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf, SlicePipe, UpperCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Comment} from '../../shared/types/comment.type';
import {CommentService} from '../../service/commentService';
import {MatFormField, MatLabel} from '@angular/material/form-field';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  templateUrl: './comment-list.component.html',
  imports: [
    FormsModule,
    NgForOf,
    MatButton,
    MatIcon,
    NgIf,
    MatFormField,
    MatLabel,
    DatePipe,
    SlicePipe,
    UpperCasePipe
  ],
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() postId!: string;
  comments: Comment[] = [];
  newComment = '';

  constructor(private readonly commentService: CommentService

  ) {

  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.commentService.getComments(this.postId).subscribe((comment) => {
      this.comments = comment;
      console.log( "id post: ", this.postId);
      console.log("Comments loaded: ", this.comments);
    });
  }

  addComment(content: string): void {

    if (content.trim()) {
      const comment: Comment = {
        postId: this.postId,
        content: content,
      };
      console.log(this.comments);

      this.commentService.addComment(comment).subscribe((newComment) => {
        this.comments.push(newComment);
        this.newComment = '';
      });
    }
  }


  isMyComment(comment: Comment): boolean {


    return true
  }


  deleteComment(commentId: string): void {
    this.commentService.deleteComment(this.postId,commentId).subscribe(() => {
      this.comments = this.comments.filter(c => c.id !== commentId);
    });
  }
}
