import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FinalPost, Idol } from '../../models/models';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { SavedNFollowsRepository } from '../../state/saved-nfollows.repository';

@Component({
  selector: 'app-followed',
  standalone: false,
  templateUrl: './followed.component.html',
  styleUrl: './followed.component.css'
})
export class FollowedComponent implements OnInit{

  private postSvc = inject(PostService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private followRepo = inject(SavedNFollowsRepository);
  names!: Idol[];
  visible = true;
      
  ngOnInit(): void {
    this.postSvc.getFollowed().then(
      (payload) => {
        console.log(payload)
        if(Array.isArray(payload)){
          this.names = payload;
          const ids: string[] = [];
          payload.forEach(i => {
            ids.push(i.userId);
          })
          this.followRepo.loadFollowed(ids);
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

  goToProfile(idx : number) {
    const uid = this.names[idx].userId;
    this.router.navigate([`/user/${uid}`]);
  }

}
