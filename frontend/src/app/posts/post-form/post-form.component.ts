import {Component, Inject, Optional} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {PostService} from "../../service/postService";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Post} from "../../shared/types/post.type";

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  postForm: FormGroup;
  selectedImage: File | null = null;
  imageError: string | null = null;
  isEditingPost: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly postService: PostService,
    @Optional() private readonly dialogRef: MatDialogRef<PostFormComponent, Post> | null,
    @Optional() @Inject(MAT_DIALOG_DATA) private readonly post: Post | null
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: [null]
    });

    if (this.post) {
      this.isEditingPost = true;
      console.log("id du post à éditer : ", this.post.id);
      this.postForm.patchValue({
        id : this.post.id,
        title: this.post.title,
        content: this.post.content
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedImage = file;
      this.imageError = null;
      this.postForm.get('image')?.setValue(file);
    }
  }

  onSubmit(): void {
    if (!this.postForm.valid) return;

    const payload = {
      ...this.postForm.value,
      id: this.post?.id
    };    if (this.isEditingPost && this.post) {
      this.postService.updatePost( payload, this.selectedImage).subscribe(
        updatedPost => this.dialogRef?.close(updatedPost),
        error => console.error(error)
      );
    } else {
      this.postService.addPost(payload, this.selectedImage).subscribe(
        () => {
          this.postForm.reset();
          this.selectedImage = null;
          alert("Post ajouté avec succès ! Vous pouvez le voir dans votre profil.");
        },
        error => console.error(error)
      );
    }
  }
}
