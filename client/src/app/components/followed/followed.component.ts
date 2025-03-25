import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FinalPost, Idol } from '../../models/models';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

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
  names!: Idol[];
  visible = true;
      
  ngOnInit(): void {
    this.postSvc.getFollowed().then(
      (payload) => {
        console.log(payload)
        if(Array.isArray(payload)){
          this.names = payload;
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

  goToProfile(idx : number) {
    const uid = this.names[idx].userId;
    this.router.navigate([`/user/${uid}`]);
  }

}
