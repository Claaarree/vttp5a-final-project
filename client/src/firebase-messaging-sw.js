// Need to add this file in the angular.json file under build!!!
// also the manifest.json
// "add gcm_sender_id": "103953800507" in manifest.json

importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyDhi8nf7W8wJqm5UMHrBuomfbsCSXZ6OZk",
authDomain: "sound-vault-452513-u3.firebaseapp.com",
projectId: "sound-vault-452513-u3",
storageBucket: "sound-vault-452513-u3.firebasestorage.app",
messagingSenderId: "158349883684",
appId: "1:158349883684:web:fdead01970d50917179bb1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/CiakWhere.svg'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
});

// {from: '158349883684', collapseKey: 'campaign_collapse_key_3477300768618769871', messageId: undefined, notification: {…}, data: {…}}collapseKey: "campaign_collapse_key_3477300768618769871"data: {gcm.n.e: '1', google.c.a.ts: '1742354895', google.c.a.udt: '0', google.c.a.e: '1', google.c.a.c_id: '3477300768618769871', …}from: "158349883684"messageId: undefinednotification: {title: 'Test', body: 'This is a test'}[[Prototype]]: Object