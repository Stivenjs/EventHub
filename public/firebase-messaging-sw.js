importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCyzBR2wdCrbqUSUZu05tmyZTgJGrmlWuc",
  authDomain: "database-login-2b2c5.firebaseapp.com",
  projectId: "database-login-2b2c5",
  storageBucket: "database-login-2b2c5.appspot.com",
  messagingSenderId: "969566120765",
  appId: "1:969566120765:web:d69d8e1bd45535fde8f354",
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
