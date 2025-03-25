import { Component, inject, Input, OnInit } from '@angular/core';
import { FinalPost, Image } from '../../models/models';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserRepository } from '../../state/user.repository';
import { Observable, take, tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-post',
  standalone: false,
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent implements OnInit{
  
  postService = inject(PostService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  location = inject(Location);
  userRepo = inject(UserRepository);
  messageSvc = inject(MessageService);
 

  postId = this.activatedRoute.snapshot.params['postId'];
  protected images: Image[] = [];
  @Input()showPost!: FinalPost;
  isSaved: boolean = false;
  isOwner: boolean = false;
  currentUser$!: Observable<string>;
  
  ngOnInit() {
    this.currentUser$ = this.userRepo.userId$;
    if(this.showPost) {
      this.loadImages(this.showPost);
      this.checkOwnership();
    } else {
      this.postService.getPostById(this.postId)
        .then(result => {
          console.log(result);
          this.showPost = result;
          this.loadImages(result);
          this.checkOwnership();
        }
      ).catch(
        err => {
          this.messageSvc
        .add({ severity: 'error', summary: 'Hmm..', detail: err, key: "tc", life: 3000 });
        }
      );
    }
  }

  loadImages(result: FinalPost) {
    const images = result.images;
    const src = images.split("|");
    Array.from(src).forEach(s => {
      console.log(s)
      this.images.push({src: s});
    });
  }

  checkOwnership() {
    console.log("in check owner")
    this.currentUser$.pipe(
      take(1),
      tap(id => {
        console.log(id);
        console.log(this.showPost.userId)
        if(this.showPost.userId === id) {
          this.isOwner = true;
        }
      })
    ).subscribe();
  }

  goToLocation() {
    this.router.navigate([`/place/${this.showPost.placeId}`])
  }

  goToUserProfile() {
    this.router.navigate([`/user/${this.showPost.userId}`]);
  }

  editPost() {
    this.router.navigate(['/editpost', this.postId]);
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.isSaved = true;
    this.postService.savePost(this.showPost).then(
      (response) => {
        const message = "The post has been saved!"
        this.messageSvc
        .add({ severity: 'success', summary: 'Success', detail: message, key: "tc", life: 3000 });
      }
    ).catch(
      err => {
        this.messageSvc
          .add({ severity: 'error', summary: 'Failed', detail: err.message, key: "tc", life: 3000 });
      }
    );
  }

  unsave() {
    this.isSaved = false;
    this.postService.unsavePost(this.postId).then(
      (response) => {
        const message = "The post has been removed from saved posts!"
        this.messageSvc
        .add({ severity: 'success', summary: 'Success', detail: message, key: "tc", life: 3000 });
      }
    ).catch(
      err => {
        this.messageSvc
          .add({ severity: 'error', summary: 'Failed', detail: err.message, key: "tc", life: 3000 });
      }
    );;
  }
}
