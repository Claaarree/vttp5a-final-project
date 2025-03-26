import { ChangeDetectorRef, Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Image, FinalPost, PostUpdate } from '../../models/models';
import { PostService } from '../../services/post.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-post',
  standalone: false,
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit{
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private postService = inject(PostService);
  private messageService = inject(MessageService);
  private cdf = inject(ChangeDetectorRef);
  form!: FormGroup;
  images!: Image[];
  postUpdate!: PostUpdate;

  previousUrl!: string;
  currentUrl!: string;
  postId!: string;
  postGot!: FinalPost;

  async ngOnInit(): Promise<void> {
    this.form = this.createForm();
    this.postId = this.activatedRoute.snapshot.params['postId'];

    if(this.postService.postGot) {
      console.log("from view")
      this.postGot = this.postService.postGot;
    } else {
      console.log("outside view")
      await this.postService.getPostById(this.postId)
        .then(payload => this.postGot = payload)
    }

    this.loadFormValues();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      rating: this.fb.control<number>(0, [Validators.min(0), Validators.max(5)]),
      review: this.fb.control<string>('', Validators.required)
    })
  }

  private loadFormValues() {
    this.images = [];
    Array.from(this.postGot.images.split("|")).forEach(s => {
      this.images.push({src: s});
    });
    this.form.patchValue({
      rating: this.postGot.rating,
      review: this.postGot.review
    });
  }

  deletePost() {
    // TODO implement delete post route back to profile with all posts
    this.postService.deletePostById(this.postId, this.postGot.placeId)
    .then((result) => {
      console.log(result);
      this.messageService
        .add({ severity: 'success', summary: 'Success', detail: result.message, key: "tc", life: 3000 });
      this.router.navigate([`/user/${this.postGot.userId}`])
    })
    .catch((error) => {
      console.log(error);
      this.messageService
        .add({ severity: 'error', summary: 'Error', detail: error.message, key: "tc", life: 3000 });
      this.router.navigate([`/user/${this.postGot.userId}`])
    })
  }

  goBack() {
    this.router.navigate([`/viewpost/${this.postId}`]);
  }

  update() {
    // TODO finish this too.... should be done?
    this.postUpdate = this.form.value;
    this.postService.updatePostById(this.postId, this.postUpdate)
      .then((result) => {
        console.log(result);
        this.messageService
          .add({ severity: 'success', summary: 'Success', detail: result.message, key: "tc", life: 3000 });
        this.router.navigate(['/viewpost', this.postId])
      })
      .catch((error) => {
        console.log(error);
        this.messageService
          .add({ severity: 'error', summary: 'Error', detail: error.message, key: "tc", life: 3000 });
        this.router.navigate(['/viewpost', this.postId])
      })
  }
}
