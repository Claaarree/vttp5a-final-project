import { inject, Injectable } from '@angular/core';
import { getToken, MessagePayload, onMessage, getMessaging } from 'firebase/messaging';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable, Subject, switchMap, take } from 'rxjs';
import { UserRepository } from '../state/user.repository';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMessagingService {

  httpClient = inject(HttpClient);
  messaging = getMessaging();
  messagingSvc = inject(MessageService);
  currentMessage = new Subject<MessagePayload>;
  private jwt$!: Observable<string> 
    
  constructor(private userRepository: UserRepository) {
    this.jwt$ = this.userRepository.jwt$
  }

  getFCMToken() {
    getToken(this.messaging, {
      // Add the public key generated from the console here.
        vapidKey: "BFctNhPhDKOi5_tCjBv5d1b-y5b5SgUqAbrOIF1tfADOmTRlhFEwTfQCNoy7_Kfdna89hqf_UrKVFnUPabwYaRM"
    }).then(payload => {
      console.log("in service:",payload);
      return lastValueFrom(this.jwt$.pipe(
              take(1), // Get the latest token value once
              switchMap(token => {
              const headers = new HttpHeaders({
                'Authorization': `Bearer ${token}`
              });
              return this.httpClient.post('/api/messaging/token', payload, {headers: headers});
            })));
      // console.log("after http");
      }
    );
  }

  // Method to handle incoming messages in the foreground
  listenForMessages(): void {
    onMessage(this.messaging, (payload) => {
      console.log('Message received in foreground: ', payload);
      this.messagingSvc.add({ severity: 'info', summary: payload.notification?.title, detail: payload.notification?.body, key: "tc", life: 3000 })
      this.currentMessage.next(payload);
    });
  }

}
