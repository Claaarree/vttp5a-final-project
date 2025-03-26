import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FinalPost, FinalPlace } from '../../models/models';
import { catchError, combineLatest, EMPTY, Observable, Subscription, switchMap, take, tap } from 'rxjs';
import { UserRepository } from '../../state/user.repository';
import { SavedNFollowsRepository } from '../../state/saved-nfollows.repository';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit, OnDestroy{
 
  private postSvc = inject(PostService);
  private activatedRoute = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private userRepo = inject(UserRepository);
  private followRepo = inject(SavedNFollowsRepository);
  userId!: string;
  posts!: FinalPost[];
  mapUrl!: string;
  postSub$!: Subscription;
  following$!: Observable<boolean>;
  isOwner : boolean = true;
  currentUser$!: Observable<string>;
  
  ngOnInit(): void {
    this.currentUser$ = this.userRepo.userId$;
    this.postSub$ = this.activatedRoute.params.pipe(
      switchMap(params => {
        this.userId = params['userId'];
   
        return combineLatest([
          this.postSvc.getAllPostsByUserId(this.userId),
          this.currentUser$
        ]);
      }),
      tap(([payload, currentUserId]) => {
        if(Array.isArray(payload)){
          this.posts = payload;
          this.following$ = this.followRepo.isFollowing(this.userId);

        } else {
          this.messageService
            .add({ severity: 'info', summary: 'No Posts', detail: payload.message, key: "tr", life: 3000 });
        }
    
        this.isOwner = this.userId === currentUserId;
        console.log('Is Owner:', this.isOwner);
      }),
      catchError((err) => {
        this.messageService
          .add({ severity: 'error', summary: 'Oops...', detail: err.message, key: "tr", life: 3000 });
        return EMPTY;
      })
    ).subscribe();
  }

  checkOwnership() {
      console.log("in check owner")
      this.currentUser$.pipe(
        take(1),
        tap(id => {
          console.log(id);
          console.log(this.userId)
          if(this.userId === id) {
            this.isOwner = true;
          }
        })
      ).subscribe();
  }

  toggleFollow() {
    this.followRepo.toggleFollow(this.userId);
    this.following$.pipe(
      take(1),
      tap(val => {
        if(val) {
          this.follow();
        }else {
          this.unfollow();
        }
      })
    ).subscribe();
  }

  follow() {
    this.postSvc.followUser(this.userId).then(
      (response) => {
        const message = "You are now following them!"
        this.messageService
        .add({ severity: 'success', summary: 'Success', detail: message, key: "tr", life: 3000 });
      }
    ).catch(
      err => {
        this.messageService
          .add({ severity: 'error', summary: 'Failed', detail: err.message, key: "tr", life: 3000 });
      }
    );
  }

  unfollow() {
    this.postSvc.unfollowUser(this.userId).then(
      (response) => {
        const message = "You are now not following them!"
        this.messageService
        .add({ severity: 'success', summary: 'Success', detail: message, key: "tr", life: 3000 });
      }
    ).catch(
      err => {
        this.messageService
          .add({ severity: 'error', summary: 'Failed', detail: err.message, key: "tr", life: 3000 });
      }
    );
  }

  ngOnDestroy(): void {
    this.postSub$.unsubscribe();
  }

}
