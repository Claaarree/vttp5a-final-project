import { Component, inject, OnInit } from '@angular/core';
import { FinalPost } from '../../models/models';
import { PostService } from '../../services/post.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  
  private postSvc = inject(PostService);
  private messageService = inject(MessageService);
  posts!: FinalPost[];
  
  ngOnInit(): void {
    this.postSvc.getRecentPosts().then(
      (payload) => {
        if(Array.isArray(payload)){
          this.posts = payload;
        } else{
          this.messageService
          .add({ severity: 'info', summary: 'No Posts', detail: payload.message, key: "tr", life: 3000 });
        }
      }
    ).catch(
      err => {
        this.messageService
          .add({ severity: 'error', summary: 'Oops...', detail: err.message, key: "tr", life: 3000 });
      }
    )
  }
}
