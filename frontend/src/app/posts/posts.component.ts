import {Component, Inject, Optional} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {PostService} from "../service/postService";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Post} from "../shared/types/post.type";

@Component({
    selector: 'app-posts',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
    templateUrl: './posts.component.html',
    styleUrl: './posts.component.css'
})
export class PostsComponent {
    postForm: FormGroup;
    selectedImage: File | null = null;
    imageError: string | null = null;
    isEditingPost: boolean = false;

    constructor(private fb: FormBuilder,
                private postService: PostService,
                @Optional() private dialogRef: MatDialogRef<PostsComponent, Post> | null,
                @Optional() @Inject(MAT_DIALOG_DATA) private post?: Post) {
        this.postForm = this.fb.group({
            title: ['', Validators.required],
            content: ['', Validators.required],
            image: [null]
        });

        if (post) {
            this.isEditingPost = true;
            this.postForm.patchValue({
                title: post.title,
                content: post.content,
                postDate: post.postDate,
                postPicture: post.postPicture
            })
        }
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            this.selectedImage = input.files[0];
            this.imageError = null;
        }
    }

    onSubmit() {
        console.log("POST Clicked!");
        console.log(this.postForm.valid);
        if (this.postForm.valid) {
            if (this.isEditingPost) {
                this.postService.updatePost(this.post?._id, this.postForm.value, this.selectedImage).subscribe(
                    (updatedPost) => this.dialogRef?.close(updatedPost),
                    error => console.log(error)
                )
            } else {
                this.postService.addPost(this.postForm.value, this.selectedImage).subscribe(
                    newPost => {
                        this.postForm.reset();
                        this.selectedImage = null;
                    },
                    error => console.log(error)
                );
            }
        }
    }
}
