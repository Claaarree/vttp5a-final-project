import { Component, inject } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FinalPost, FinalPlace } from '../../models/models';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  private postSvc = inject(PostService);
  private activatedRoute = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  userId!: string;
  posts!: FinalPost[];
  mapUrl!: string;
  
  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['userId'];
    this.postSvc.getAllPostsByUserId(this.userId).then(
      (payload) => {
        if(Array.isArray(payload)){
          this.posts = payload;
        } else{
          this.messageService
          .add({ severity: 'info', summary: 'No Posts', detail: payload.message, key: "tc", life: 3000 });
        }
      }
    ).catch(err => {
      this.messageService
          .add({ severity: 'error', summary: 'Oops...', detail: err.message, key: "tc", life: 3000 });
    });
  }
}
