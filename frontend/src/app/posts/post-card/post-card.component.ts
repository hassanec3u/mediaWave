import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Post} from "../../shared/types/post.type";
import {DatePipe, NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/dialog/confirm-dialog/confirm-dialog.component";
import {PostService} from "../../service/postService";
import {catchError, of} from "rxjs";
import {PostFormComponent} from "../post-form/post-form.component";
import {CommentListComponent} from '../../comment/comment-list/comment-list.component';
import {environment} from "../../../environments/environments";
import {LikeComponent} from '../../like/like.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    CommentListComponent,
    LikeComponent,
    FormsModule,


  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})

export class PostCardComponent {

  @Input()
  enableEdit: boolean = false;

  @Input()
  userProfilePicture!: string | undefined;

  @Output()
  onPostDeleted: EventEmitter<string>;

  @Output()
  onPostEdited: EventEmitter<Post>;

  private _post!: Post;

  defaultImage: string = environment.defaultImageProfile;


  constructor(private readonly dialog: MatDialog,
              private readonly postService: PostService) {
    this.onPostDeleted = new EventEmitter<string>();
    this.onPostEdited = new EventEmitter<Post>();
  }

  get post(): Post {
    return this._post;
  }

  @Input()
  set post(value: Post) {
    this._post = value;
  }

  openDeleteDialog(postId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletePost(postId);
      }
    });
  }

  deletePost(postId: string) {
    console.log('Suppression du post avec ID :', postId);
    this.postService.deletePost(postId).subscribe(() => {
      this.onPostDeleted.emit(postId);
    });
  }

   editPost() {
    const editDialogRef = this.dialog.open(PostFormComponent, {
      width: '500px',
      data: this._post
    });
    editDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onPostEdited.emit(result);
      }
    });
  }
}
