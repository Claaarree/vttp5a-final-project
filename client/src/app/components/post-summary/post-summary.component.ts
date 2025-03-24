import { Component, inject, Input, OnInit } from '@angular/core';
import { FinalPost, Image,  } from '../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-summary',
  standalone: false,
  templateUrl: './post-summary.component.html',
  styleUrl: './post-summary.component.css'
})
export class PostSummaryComponent implements OnInit{
  @Input() post!: FinalPost;
  images: Image[] = [];
  private router = inject(Router);
  
  ngOnInit(): void {
    const split = this.post.images.split("|");
    Array.from(split).forEach(s => {
      this.images.push({src: s});
    })
  }

  seePostDetails() {
    this.router.navigate([`/viewpost/${this.post.postId}`])
  }
}
