import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FinalPost } from '../../models/models';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-saved-posts',
  standalone: false,
  templateUrl: './saved-posts.component.html',
  styleUrl: './saved-posts.component.css'
})
export class SavedPostsComponent implements OnInit{
  private postSvc = inject(PostService);
  private messageService = inject(MessageService);
  posts!: FinalPost[];
    
  ngOnInit(): void {
    this.postSvc.getSavedPosts().then(
      (payload) => {
        if(Array.isArray(payload)){
          this.posts = payload;
        } else{
          this.messageService
          .add({ severity: 'info', summary: 'No Posts', detail: payload.message, key: "tc", life: 3000 });
        }
      }
    ).catch(
      err => {
        this.messageService
          .add({ severity: 'error', summary: 'Oops...', detail: err.message, key: "tc", life: 3000 });
      }
    )
  }
}
