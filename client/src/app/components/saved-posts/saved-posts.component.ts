import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FinalPost } from '../../models/models';
import { PostService } from '../../services/post.service';
import { SavedNFollowsRepository } from '../../state/saved-nfollows.repository';

@Component({
  selector: 'app-saved-posts',
  standalone: false,
  templateUrl: './saved-posts.component.html',
  styleUrl: './saved-posts.component.css'
})
export class SavedPostsComponent implements OnInit{
  private postSvc = inject(PostService);
  private messageService = inject(MessageService);
  private savedRepo = inject(SavedNFollowsRepository);
  posts!: FinalPost[];
    
  ngOnInit(): void {
    this.postSvc.getSavedPosts().then(
      (payload) => {
        if(Array.isArray(payload)){
          this.posts = payload;
          const ids: string[] = [];
          payload.forEach(i => {
            ids.push(i.postId);
          })
          this.savedRepo.loadSaved(ids);
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
