import { Component, inject, OnInit } from '@angular/core';
import { FinalPost, Image } from '../../models/models';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-post',
  standalone: false,
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent implements OnInit{
  
  postService = inject(PostService);
  activatedRoute = inject(ActivatedRoute);
  postId = this.activatedRoute.snapshot.params['postId'];
  protected images: Image[] = [];
  showPost!: FinalPost;
  
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
  }
}
