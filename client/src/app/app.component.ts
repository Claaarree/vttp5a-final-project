import { Component, inject, OnInit } from '@angular/core';
import { FirebaseMessagingService } from './services/firebase-messaging.service';
import { getToken, onMessage } from 'firebase/messaging';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'final-project';
  messager = inject(FirebaseMessagingService);

  
  ngOnInit(): void {
    this.registerServiceWorker();
    this.requestPermission();
  }

  // requestPermission() {
  //   console.log("in here")
  //   Notification.requestPermission().then(permission => {
  //     if (permission === 'granted') {
  //       console.log('Notification permission granted.');
  //       this.messager.getFCMToken();
  //     }
  //   });
  // }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service worker registered:', registration);
        // You might want to get the token here after successful registration
        // this.messager.getFCMToken();
      } catch (error) {
        console.error('Error registering service worker:', error);
      }
    } else {
      console.log('Service workers are not supported in this browser.');
    }
  }

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
        this.messager.getFCMToken();
      } else {
        console.log('Permission denied or dismissed.');
      }
    });
  }

}
