import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FirebaseMessagingService } from './services/firebase-messaging.service';
import { MessagePayload } from 'firebase/messaging';
import { combineLatest, filter, Observable, Subject, Subscription, tap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { UserService } from './services/user.service';
import { UserRepository } from './state/user.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  
  title = 'final-project';
  messager = inject(FirebaseMessagingService);
  userSvc = inject(UserService);
  userRepo = inject(UserRepository);
  message$!: Subject<MessagePayload>;
  items: MenuItem[] | undefined;
  currentUser$!: Observable<string>;
  userId!: string;
  isAuthenticated$!: Observable<boolean>;
  isAuthenticated!: boolean;
  authSubscription!: Subscription;
  
  ngOnInit(): void {
      this.authSubscription = combineLatest([
      this.userRepo.userId$,
      this.userRepo.isAuthenticated$
    ]).pipe(
      filter(([userId, isAuthenticated]) => isAuthenticated && !!userId),
      tap(([userId, isAuthenticated]) => {
        this.userId = userId;
        this.isAuthenticated = isAuthenticated;
        this.loadItems();

        this.requestPermission();
        this.messager.listenForMessages();
        this.message$ = this.messager.currentMessage;
      })
    ).subscribe();

    // this.registerServiceWorker();
    

  }

  loadItems() {
    this.items = [
        {
          label: 'Home',
          icon: '/svg/home-svgrepo-com.svg',
          route: '/home'
        },
        {
          label: 'Explore',
          icon: '/svg/compass-svgrepo-com.svg',
          route: '/viewplaces'
        },
        {
          label: 'Create',
          icon: '/svg/plus-svgrepo-com.svg',
          route: '/newpost'
        },
        {
            label: 'My Profile',
            icon: '/svg/profile-round-1342-svgrepo-com.svg',
            items: [
                {
                  label: 'My Posts',
                  icon: '/svg/camera-svgrepo-com.svg',
                  route: `user/${this.userId}`
                },
                {
                  label: 'Following',
                  icon: '/svg/heart-svgrepo-com.svg', 
                  route: '/followed'                   
                },              
                {
                  label: 'Saved Posts',
                  icon: '/svg/bookmark-svgrepo-com.svg',  
                  route: '/saved'                  
                },
                {
                  label: 'Logout',
                  icon: '/svg/logout-svgrepo-com.svg',  
                  command: () => {
                    this.userSvc.logout();
                    this.items = [];
                  }                 
                },
            ],
        },
    ];
   
  }


  requestPermission(): void {
    console.log("Requesting notification permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // TODO change back!
        this.messager.getFCMToken();
      } else {
        console.log('Permission denied or dismissed.');
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
