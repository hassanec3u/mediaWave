import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {Post} from "../types/post.type";
import {DatePipe, NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../dialog/confirm-dialog/confirm-dialog.component";
import {PostService} from "../../service/postService";
import {catchError, map, Observable, of} from "rxjs";
import {PostsComponent} from "../../posts/posts.component";
import {UserService} from "../../service/userService";

@Component({
  selector: 'app-card-post',
  standalone: true,
    imports: [
        MatIcon,
        MatMenu,
        MatMenuTrigger,
        DatePipe,
        NgIf
    ],
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.css'
})
export class CardPostComponent {
    private _post!: Post;
    @Output() onPostDeleted: EventEmitter<string>;
    @Output() onPostEdited: EventEmitter<Post>;

    constructor(private dialog: MatDialog,
                private postService: PostService,
                private userService: UserService) {
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

    openDeleteDialog(postId: string | undefined): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.deletePost(postId);
            }
        });
    }

    deletePost(postId: string | undefined){
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
            if(result) {
                console.log(result.postPicture)
                this.userService.getProfilePicture(result.postPicture).subscribe(
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
}
