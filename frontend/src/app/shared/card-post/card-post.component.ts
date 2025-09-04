import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {Post} from "../types/post.type";
import {DatePipe, NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../dialog/confirm-dialog/confirm-dialog.component";
import {PostService} from "../../service/postService";
import {catchError, of} from "rxjs";
import {PostsComponent} from "../../posts/posts.component";
import {PicturesService} from "../../service/picturesService";
import {CommentListComponent} from '../../comment/comment-list/comment-list.component';
import {environment} from "../../../environments/environments";
import {LikeComponent} from '../../like/like.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {comment} from 'postcss';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-card-post',
  standalone: true,
  imports: [
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    DatePipe,
    NgIf,
    CommentListComponent,
    LikeComponent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    FormsModule,
    MatCardContent,
    MatButton,
    MatMenuItem,
  ],
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.css'
})

export class CardPostComponent {
  private _post!: Post;
  @Output() onPostDeleted: EventEmitter<string>;
  @Output() onPostEdited: EventEmitter<Post>;
  @Input() enableEdit: boolean = false;
  @Input() userProfilePicture!: string | undefined;
  showComments = false;
  defaultImage: string = environment.defaultImageProfile;

  constructor(private dialog: MatDialog,
              private postService: PostService,
              private picturesService: PicturesService) {
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

  openDeleteDialog(postId: string ): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletePost(postId);
      }
    });
  }

  deletePost(postId: string ) {
    console.log('Suppression du post avec ID :', postId);
    this.postService.deletePost(postId).subscribe(() => {
      this.onPostDeleted.emit(postId);
    });
  }

  editPost() {
    const editDialogRef = this.dialog.open(PostsComponent, {
      width: '500px',
      data: this._post
    });
    editDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result.postPicture)
        this.picturesService.getPicture(result.postPicture).subscribe(
          res => result.postPicture = URL.createObjectURL(res),
          catchError(error => {
            console.error(`Erreur pour le post ${result._id}:`, error);
            return of(result);
          })
        )
        console.log(result.postPicture)
        this.onPostEdited.emit(result);
      }
    });
  }

  toggleComments ( postId: string ) {
    this.showComments = !this.showComments;
  }

  protected readonly comment = comment;
}
