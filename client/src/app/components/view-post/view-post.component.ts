import { Component, inject, OnInit } from '@angular/core';
import { FinalPost, Image } from '../../models/models';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TokenQuery } from '../../state/token.query';

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
  tokenQuery = inject(TokenQuery);

  postId = this.activatedRoute.snapshot.params['postId'];
  protected images: Image[] = [];
  showPost!: FinalPost;
  isSaved: boolean = false;
  isOwner: boolean = false;
  
  ngOnInit(): void {
    this.postService.getPostById(this.postId)
      .then(result => {
        console.log(result);
        this.showPost = result;
        const images = result.images;
        const src = images.split("|");
        Array.from(src).forEach(s => {
          console.log(s)
          this.images.push({src: s});
        });
      }
    );
    this.tokenQuery.getUserId()
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

  // also to do check if post belowngs to user for edit
  save() {
    this.isSaved = true;
  }

  unsave() {
    this.isSaved = false;
  }
}
