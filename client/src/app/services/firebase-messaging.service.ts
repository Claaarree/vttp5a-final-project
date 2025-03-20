import { inject, Injectable } from '@angular/core';
import { getToken, MessagePayload, onMessage, getMessaging } from 'firebase/messaging';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMessagingService {

  httpClient = inject(HttpClient);
  messaging = getMessaging();
  currentMessage = new Subject<MessagePayload>;

  getFCMToken() {
    getToken(this.messaging, {
      // Add the public key generated from the console here.
        vapidKey: "BFctNhPhDKOi5_tCjBv5d1b-y5b5SgUqAbrOIF1tfADOmTRlhFEwTfQCNoy7_Kfdna89hqf_UrKVFnUPabwYaRM"
    }).then(payload => {
      console.log("in service:",payload);
      lastValueFrom(this.httpClient.post<string>('/api/messaging/token', payload));
      console.log("after http");
      }
    );
  }

  // Method to handle incoming messages in the foreground
  listenForMessages(): void {
    onMessage(this.messaging, (payload) => {
      console.log('Message received in foreground: ', payload);
      // Display the notification to the user (you might use a service for this)
      this.currentMessage.next(payload);
    });
  }

}
