import {Component, Input, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf, SlicePipe, UpperCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Comment} from '../../shared/types/comment.type';
import {CommentService} from '../../service/commentService';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  templateUrl: './comment-list.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    DatePipe,
    SlicePipe,
    UpperCasePipe
  ],
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() postId!: string;
  @Input() postOwnerId!: string;
  comments: Comment[] = [];
  newComment = '';

  constructor(private readonly commentService: CommentService,
              private readonly cookieService: CookieService) {

  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.commentService.getComments(this.postId).subscribe((comment) => {
      this.comments = comment;
    });
  }

  addComment(content: string): void {

    if (content.trim()) {
      const comment: Comment = {
        postId: this.postId,
        content: content,
      };

      this.commentService.addComment(comment).subscribe((newComment) => {
        this.comments.push(newComment);
        this.newComment = '';
      });
    }
  }


  canDeleteComment(comment: Comment): boolean {
    const userId = this.cookieService.get('userId');
    return comment.authorId === userId || this.postOwnerId === userId;
  }



  deleteComment(commentId: string): void {
    this.commentService.deleteComment(this.postId, commentId).subscribe(() => {
      this.comments = this.comments.filter(c => c.id !== commentId);
    });
  }
}
