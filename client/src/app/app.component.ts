import { Component, inject, OnInit } from '@angular/core';
import { FirebaseMessagingService } from './services/firebase-messaging.service';
import { MessagePayload } from 'firebase/messaging';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'final-project';
  messager = inject(FirebaseMessagingService);
  message$!: Subject<MessagePayload>;

  
  ngOnInit(): void {
    // this.registerServiceWorker();
    this.requestPermission();
    this.messager.listenForMessages();
    this.message$ = this.messager.currentMessage;
  }

  // unregisterServiceWorker(): void {
  //   navigator.serviceWorker.getRegistration('/firebase-messaging-sw.js')
  //     .then(registration => {
  //       if (registration) {
  //         registration.unregister()
  //           .then(success => {
  //             if (success) {
  //               console.log('Service worker unregistered successfully.');
  //               this.isServiceWorkerUnregistered = true; // Set the flag
  //               // Optionally, inform the user that unregistration was successful
  //             } else {
  //               console.log('Service worker unregistration failed.');
  //               // Optionally, inform the user about the failure
  //             }
  //           });
  //       } else {
  //         console.log('No service worker found to unregister.');
  //         this.isServiceWorkerUnregistered = true; // Consider it unregistered if not found
  //         // Optionally, inform the user that no service worker was found
  //       }
  //     });
  // }

  // async registerServiceWorker() {
  //   if ('serviceWorker' in navigator) {
  //     try {
  //       const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
  //       console.log('Service worker registered:', registration);
  //       // You might want to get the token here after successful registration
  //       // this.messager.getFCMToken();
  //     } catch (error) {
  //       console.error('Error registering service worker:', error);
  //     }
  //   } else {
  //     console.log('Service workers are not supported in this browser.');
  //   }
  // }

  // async getFCMToken(): Promise<string | null> {
  //   try {
  //     const token = await getToken(this.messaging, { vapidKey: environment.firebaseConfig.vapidKey });
  //     if (token) {
  //       console.log('FCM Registration Token:', token);
  //       return token;
  //       // Send this token to your server to associate with the user
  //     } else {
  //       console.log('No registration token available. Request permission to generate one.');
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error('An error occurred while retrieving the FCM token:', error);
  //     return null;
  //   }
  // }

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

}
