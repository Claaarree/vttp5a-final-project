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
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
});