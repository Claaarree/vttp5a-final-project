import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Image, FinalPost, PostUpdate } from '../../models/models';
import { FileUploadService } from '../../services/file-upload.service';
import { PostService } from '../../services/post.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  standalone: false,
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private postService = inject(PostService);
  form!: FormGroup;
  images: Image[] = [];
  postUpdate!: PostUpdate;

  previousUrl!: string;
  currentUrl!: string;
  postId!: string;
  postGot!: FinalPost;

  async ngOnInit(): Promise<void> {
    this.form = this.createForm();
    this.postId = this.activatedRoute.snapshot.params['postId'];
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.urlAfterRedirects;
      console.log('Previous URL:', this.previousUrl);
      console.log('Current URL:', this.currentUrl);
    });

    // Take actions based on this.previousUrl
    if (this.previousUrl === `/viewpost/${this.postId}`) {
      console.log('User came from /some-other-route');
      this.postGot = this.postService.postGot;
      
    } else {
      console.log('User came from /another-route');
      // Perform different actions
      await this.postService.getPostById(this.postId).then(
        payload => this.postGot = payload
      )
    }
    console.log(this.postGot);
    this.loadFormValues();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      rating: this.fb.control<number>(0, [Validators.min(0), Validators.max(5)]),
      review: this.fb.control<string>('', Validators.required)
    })
  }

  private loadFormValues() {
    this.form.patchValue({
      rating: this.postGot.rating,
      review: this.postGot.review
    });
    Array.from(this.postGot.images.split("|")).forEach(s => {
      this.images.push({src: s});
    });
  }

  deletePost() {
    // TODO implement delete post
  }

  update() {
    // TODO finish this too....
    this.postUpdate = this.form.value;
    // 
    // console.log(this.filelist);
    // 
    this.postService.updatePostById(this.postId, this.postUpdate)
      .then((result) => {
        console.log(result);
        this.router.navigate(['/viewpost', this.postId])
      })
  }
}
