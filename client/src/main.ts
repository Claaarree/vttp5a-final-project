import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { environment } from '../src/environments/environment';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));


const firebaseConfig = {
    apiKey: "AIzaSyDhi8nf7W8wJqm5UMHrBuomfbsCSXZ6OZk",
    authDomain: "sound-vault-452513-u3.firebaseapp.com",
    projectId: "sound-vault-452513-u3",
    storageBucket: "sound-vault-452513-u3.firebasestorage.app",
    messagingSenderId: "158349883684",
    appId: "1:158349883684:web:fdead01970d50917179bb1"
}
// Initialize Firebase with your config
// const firebaseConfig = environment.firebaseConfig;  // Example: Firebase config from environment.ts
const app = initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = getMessaging(app);
