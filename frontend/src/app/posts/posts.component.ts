import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {PostService} from "../service/postService";

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

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: [null]
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size > 2 * 1024 * 1024) {
        this.imageError = 'La taille de l\'image ne doit pas dépasser 2 Mo.';
        this.selectedImage = null;
      } else {
        this.selectedImage = file;
        this.imageError = null;
      }
    }
  }

  onSubmit() {
    console.log("POST Clicked!");
    console.log(this.postForm.valid);
    if (this.postForm.valid) {
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
